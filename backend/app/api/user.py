import uuid
from typing import Annotated

from fastapi import APIRouter, Cookie, HTTPException, Response, status

from app.core.config import settings
from app.core.dependencies import CurrentAdmin, CurrentUser, DbSession, UserServiceDep
from app.core.exceptions import (
    CannotDeleteSelfError,
    InvalidCredentialsError,
    InvalidTokenError,
    UserNotFoundError,
)
from app.core.security import create_access_token
from app.schemas.users import AuthRequest, AuthResponse, TokenResponse, UserResponse

router = APIRouter(prefix="/api/users", tags=["Users"])

REFRESH_COOKIE = "refresh_token"
REFRESH_COOKIE_PATH = "/api/users"


def _set_refresh_cookie(response: Response, token: str) -> None:
    # SameSite=None + Secure: frontend and backend are on different sites
    response.set_cookie(
        REFRESH_COOKIE,
        token,
        httponly=True,
        secure=True,
        samesite="none",
        path=REFRESH_COOKIE_PATH,
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 86400,
    )


@router.post("/auth", response_model=AuthResponse)
def login_or_signup(
    payload: AuthRequest, response: Response, db: DbSession, user_service: UserServiceDep
):
    try:
        user, is_new_user = user_service.login_or_signup(db, payload.email, payload.password)
    except InvalidCredentialsError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    _set_refresh_cookie(response, user_service.create_refresh_token(db, user))

    message = "Account created" if is_new_user else "Login successful"
    return AuthResponse(
        access_token=create_access_token(user.id, user.role),
        user=UserResponse.model_validate(user),  # ORM object -> response schema
        is_new_user=is_new_user,
        message=message,
    )


@router.post("/refresh", response_model=TokenResponse)
def refresh(
    db: DbSession,
    user_service: UserServiceDep,
    refresh_token: Annotated[str | None, Cookie()] = None,
):
    try:
        if refresh_token is None:
            raise InvalidTokenError()
        user = user_service.get_user_from_refresh_token(db, refresh_token)
    except InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Session expired, please log in again")

    return TokenResponse(access_token=create_access_token(user.id, user.role))


@router.post("/logout", status_code=status.HTTP_204_NO_CONTENT)
def logout(
    response: Response,
    db: DbSession,
    user_service: UserServiceDep,
    refresh_token: Annotated[str | None, Cookie()] = None,
):
    if refresh_token is not None:
        user_service.revoke_refresh_token(db, refresh_token)
    response.delete_cookie(
        REFRESH_COOKIE, path=REFRESH_COOKIE_PATH, secure=True, httponly=True, samesite="none"
    )


@router.get("/me", response_model=UserResponse)
def get_me(user: CurrentUser):
    return user


# Admin-only. The admin is identified from the Bearer token, no request body.
@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(
    user_id: uuid.UUID, admin: CurrentAdmin, db: DbSession, user_service: UserServiceDep
):
    try:
        user_service.delete_user(db, admin, user_id)
    except CannotDeleteSelfError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Admins cannot delete themselves")
    except UserNotFoundError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

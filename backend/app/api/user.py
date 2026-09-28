import uuid

from fastapi import APIRouter, HTTPException, status

from app.core.dependencies import CurrentAdmin, CurrentUser, DbSession, UserServiceDep
from app.core.exceptions import (
    CannotDeleteSelfError,
    InvalidCredentialsError,
    UserNotFoundError,
)
from app.core.security import create_access_token
from app.schemas.users import AuthRequest, AuthResponse, UserResponse

router = APIRouter(prefix="/api/users", tags=["Users"])

@router.post("/auth", response_model=AuthResponse)
def login_or_signup(payload: AuthRequest, db: DbSession, user_service: UserServiceDep):
    try:
        user, is_new_user = user_service.login_or_signup(db, payload.email, payload.password)
    except InvalidCredentialsError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")

    message = "Account created" if is_new_user else "Login successful"
    return AuthResponse(
        access_token=create_access_token(user.id, user.role),
        user=UserResponse.model_validate(user),  # ORM object -> response schema
        is_new_user=is_new_user,
        message=message,
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

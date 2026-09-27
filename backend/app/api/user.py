import uuid

from fastapi import APIRouter, HTTPException, status

from app.core.dependencies import DbSession, UserServiceDep
from app.core.exceptions import (
    CannotDeleteSelfError,
    InvalidCredentialsError,
    PermissionDeniedError,
    UserNotFoundError,
)
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
        user=UserResponse.model_validate(user),  # ORM object -> response schema
        is_new_user=is_new_user,
        message=message,
    )


# Admin-only. The body holds the ADMIN's own email + password (temporary until JWT).
@router.delete("/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_user(
    user_id: uuid.UUID, admin: AuthRequest, db: DbSession, user_service: UserServiceDep
):
    try:
        user_service.delete_user(db, admin.email, admin.password, user_id)
    except InvalidCredentialsError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    except PermissionDeniedError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    except CannotDeleteSelfError:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Admins cannot delete themselves")
    except UserNotFoundError:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

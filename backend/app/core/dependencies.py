import uuid
from functools import lru_cache
from typing import Annotated

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from app.core.exceptions import InvalidTokenError
from app.core.security import decode_access_token
from app.db.connection import SessionLocal
from app.db.models import User
from app.services.user_management.user_service import UserService

# auto_error=False so a missing header gives our own 401 (not FastAPI's default 403)
bearer_scheme = HTTPBearer(auto_error=False)


def get_db():
    # One session per request, always closed afterwards (NOT a singleton)
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@lru_cache
def get_user_service() -> UserService:
    # lru_cache runs this once; every later call returns the same instance (singleton)
    return UserService()


DbSession = Annotated[Session, Depends(get_db)]
UserServiceDep = Annotated[UserService, Depends(get_user_service)]


def _unauthorized() -> HTTPException:
    return HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid or expired token",
        headers={"WWW-Authenticate": "Bearer"},
    )


def get_current_user(
    credentials: Annotated[HTTPAuthorizationCredentials | None, Depends(bearer_scheme)],
    db: DbSession,
) -> User:
    # Token -> user id (sub) -> user loaded fresh from the DB, so deleted users
    # and role changes take effect immediately
    if credentials is None:
        raise _unauthorized()
    try:
        payload = decode_access_token(credentials.credentials)
        user_id = uuid.UUID(payload["sub"])
    except (InvalidTokenError, KeyError, ValueError):
        raise _unauthorized()

    user = db.get(User, user_id)
    if user is None:
        raise _unauthorized()
    return user


CurrentUser = Annotated[User, Depends(get_current_user)]


def get_current_admin(user: CurrentUser) -> User:
    if user.role != "admin":
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Admin access required")
    return user


CurrentAdmin = Annotated[User, Depends(get_current_admin)]

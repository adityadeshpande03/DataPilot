from functools import lru_cache
from typing import Annotated

from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.connection import SessionLocal
from app.services.user_management.user_service import UserService


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

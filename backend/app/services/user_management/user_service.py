import uuid

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.exceptions import (
    CannotDeleteSelfError,
    InvalidCredentialsError,
    PermissionDeniedError,
    UserNotFoundError,
)
from app.core.logging import get_logger
from app.core.security import hash_password, verify_password
from app.db.models import User

logger = get_logger(__name__)


class UserService:
    # Stateless: the db session is passed into each method and never stored
    # on self, so one shared instance can safely serve every request.

    def get_user_by_email(self, db: Session, email: str) -> User | None:
        return db.scalar(select(User).where(User.email == email))

    def create_user(self, db: Session, email: str, password: str) -> User:
        user = User(email=email, password_hash=hash_password(password), role="user")
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    def login_or_signup(self, db: Session, email: str, password: str) -> tuple[User, bool]:
        # Returns (user, is_new_user)
        email = email.strip().lower()
        user = self.get_user_by_email(db, email)

        if user is None:
            user = self.create_user(db, email, password)
            logger.info(f"User created: {email}")
            return user, True

        if not verify_password(password, user.password_hash):
            logger.warning(f"Invalid password for: {email}")
            raise InvalidCredentialsError()

        logger.info(f"User logged in: {email}")
        return user, False

    def authenticate(self, db: Session, email: str, password: str) -> User:
        # Like login, but never creates a user: unknown email or wrong password both fail
        user = self.get_user_by_email(db, email.strip().lower())
        if user is None or not verify_password(password, user.password_hash):
            raise InvalidCredentialsError()
        return user

    def delete_user(
        self, db: Session, admin_email: str, admin_password: str, user_id: uuid.UUID
    ) -> None:
        admin = self.authenticate(db, admin_email, admin_password)
        if admin.role != "admin":
            raise PermissionDeniedError()
        if admin.id == user_id:
            raise CannotDeleteSelfError()

        user = db.get(User, user_id)
        if user is None:
            raise UserNotFoundError()

        db.delete(user)
        db.commit()
        logger.info(f"User {user.email} deleted by admin {admin.email}")

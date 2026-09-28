import uuid
from datetime import datetime, timedelta, timezone

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.exceptions import (
    CannotDeleteSelfError,
    InvalidCredentialsError,
    InvalidTokenError,
    UserNotFoundError,
)
from app.core.logging import get_logger
from app.core.security import (
    generate_refresh_token,
    hash_password,
    hash_refresh_token,
    verify_password,
)
from app.db.models import RefreshToken, User

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

    def delete_user(self, db: Session, admin: User, user_id: uuid.UUID) -> None:
        # admin is already authenticated + role-checked by the CurrentAdmin dependency
        if admin.id == user_id:
            raise CannotDeleteSelfError()

        user = db.get(User, user_id)
        if user is None:
            raise UserNotFoundError()

        db.delete(user)
        db.commit()
        logger.info(f"User {user.email} deleted by admin {admin.email}")

    def create_refresh_token(self, db: Session, user: User) -> str:
        # Returns the raw token for the cookie; only its hash is stored
        token = generate_refresh_token()
        db.add(
            RefreshToken(
                user_id=user.id,
                token_hash=hash_refresh_token(token),
                expires_at=datetime.now(timezone.utc)
                + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS),
            )
        )
        db.commit()
        return token

    def get_user_from_refresh_token(self, db: Session, token: str) -> User:
        row = db.scalar(
            select(RefreshToken).where(RefreshToken.token_hash == hash_refresh_token(token))
        )
        if row is None or row.revoked_at is not None or row.expires_at < datetime.now(timezone.utc):
            raise InvalidTokenError()

        user = db.get(User, row.user_id)
        if user is None:
            raise InvalidTokenError()
        return user

    def revoke_refresh_token(self, db: Session, token: str) -> None:
        row = db.scalar(
            select(RefreshToken).where(RefreshToken.token_hash == hash_refresh_token(token))
        )
        if row is not None and row.revoked_at is None:
            row.revoked_at = datetime.now(timezone.utc)
            db.commit()

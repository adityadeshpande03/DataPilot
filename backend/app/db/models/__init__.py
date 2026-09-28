# Import every model here so Alembic sees it in Base.metadata.
from app.db.models.refresh_token import RefreshToken
from app.db.models.user import User

__all__ = ["RefreshToken", "User"]

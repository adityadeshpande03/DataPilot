from datetime import datetime
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class AuthRequest(BaseModel):
    email: EmailStr
    password: str = Field(min_length=8)


class UserResponse(BaseModel):
    # from_attributes lets Pydantic read a SQLAlchemy User object directly.
    # password_hash is deliberately not listed, so it is never returned.
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    email: EmailStr
    role: str
    created_at: datetime


class AuthResponse(BaseModel):
    user: UserResponse
    is_new_user: bool
    message: str

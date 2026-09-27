from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    # Parent class for all ORM models. Base.metadata holds every table
    # definition and is what Alembic compares against the database.
    pass

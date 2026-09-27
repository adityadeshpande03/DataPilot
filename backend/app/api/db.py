from fastapi import APIRouter

from app.db.connection import check_db_connection

router = APIRouter(prefix="/api/db", tags=["Database"])

@router.get("/connection")
def db_health():
    connected, message = check_db_connection()
    return {"connected": connected, "message": message}

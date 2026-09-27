from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.db import router as db_router
from app.api.user import router as user_router
from app.core.logging import get_logger, setup_logging
from app.db.connection import check_db_connection

setup_logging()
logger = get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: check the database connection
    connected, message = check_db_connection()
    if connected:
        logger.info(message)
    else:
        logger.error(message)
    yield


app = FastAPI(title="DataPilot Backend API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(db_router)
app.include_router(user_router)

@app.get("/")
async def root():
    return {"message": "Welcome to the DataPilot Backend API!"}

if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
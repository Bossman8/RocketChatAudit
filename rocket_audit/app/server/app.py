from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from server.routes.user import router as UserRouter
from server.routes.message import router as MessageRouter
from server.routes.room import router as RoomRouter

app = FastAPI()

app.include_router(UserRouter, tags=["User"], prefix="/user")
app.include_router(MessageRouter, tags=["Message"], prefix="/message")
app.include_router(RoomRouter, tags=["Room"], prefix="/room")

origins = [
    "http://10.0.92.87:8080",
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/", tags=["Root"])
async def read_root():
    return {"message": "Rocket.Chat Audit"}
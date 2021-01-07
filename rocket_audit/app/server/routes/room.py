from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from server.database import (
    retrieve_rooms,
    retrieve_room,
)
from server.models.users import (
    ErrorResponseModel,
    ResponseModel
)

router = APIRouter()


@router.get("/", response_description="Rooms retrieved")
async def get_all_rooms():
    rooms = await retrieve_rooms()
    if rooms:
        return ResponseModel(rooms, "rooms data retrieved successfully")
    return ResponseModel(rooms, "Empty list returned")

@router.get("/{id}", response_description="Room data retrieved")
async def get_user(id):
    room = await retrieve_room(id)
    if room:
        return ResponseModel(room, "room data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "room doesn't exist.")
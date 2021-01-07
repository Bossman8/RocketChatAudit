from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from server.database import (
    retrieve_message,
    retrieve_messages,
    retrieve_user_message,
)
from server.models.users import (
    ErrorResponseModel,
    ResponseModel
)

router = APIRouter()


@router.get("/", response_description="Messages retrieved")
async def get_all_messages():
    messages = await retrieve_messages()
    if messages:
        return ResponseModel(messages, "messages data retrieved successfully")
    return ResponseModel(messages, "Empty list returned")


@router.get("/rid/{rid}", response_description="Message data retrieved")
async def get_room_messages(rid):
    message = await retrieve_message(rid)
    if message:
        return ResponseModel(message, "message data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "message doesn't exist.")

@router.get("/user/{user}", response_description="Message data retrieved")
async def get_user_messages(user):
    message = await retrieve_user_message(user)
    if message:
        return ResponseModel(message, "message data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "message doesn't exist.")

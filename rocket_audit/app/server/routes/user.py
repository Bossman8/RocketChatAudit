from fastapi import APIRouter, Body
from fastapi.encoders import jsonable_encoder

from server.database import (
    retrieve_user,
    retrieve_users,
)
from server.models.users import (
    ErrorResponseModel,
    ResponseModel
)

router = APIRouter()


@router.get("/", response_description="users retrieved")
async def get_all_users():
    users = await retrieve_users()
    if users:
        return ResponseModel(users, "users data retrieved successfully")
    return ResponseModel(users, "Empty list returned")


@router.get("/{id}", response_description="user data retrieved")
async def get_user(id):
    user = await retrieve_user(id)
    if user:
        return ResponseModel(user, "User data retrieved successfully")
    return ErrorResponseModel("An error occurred.", 404, "User doesn't exist.")

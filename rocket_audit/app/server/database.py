import motor.motor_asyncio
from bson.objectid import ObjectId

MONGO_DETAILS = "mongodb://localhost:27017"

client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_DETAILS)

database = client.parties

user_collection = database.get_collection("users")
message_collection = database.get_collection("rocketchat_message")
room_collection = database.get_collection("rocketchat_room")

# helpers
def user_helper(user) -> dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "active": user["active"],
        "username": user["username"]
    }


def message_helper(message) -> dict:
    return {
        "id": str(message["_id"]),
        "name": message["msg"],
        "msg": message["msg"],
        "rid": message["rid"],
        "ts": message["ts"],
        "u": message["u"],
    }


# Retrieve all users present in the database
async def retrieve_users():
    users = []
    async for user in user_collection.find():
        users.append(user_helper(user))
    return users

# Retrieve a user with a user id
async def retrieve_user(id: str) -> dict:
    user = await user_collection.find_one({"_id": id})
    if user:
        return user_helper(user)

# Retrieve all rooms present in the database
async def retrieve_rooms():
    rooms = []
    async for room in room_collection.find():
        rooms.append(room)
    return rooms

# Retrieve room with its room ID(rid)
async def retrieve_room(rid: str) -> dict:
    room = await room_collection.find_one({"_id": rid})
    if room:
        return room

# Retrieve all messages present in the database
async def retrieve_messages():
    messages = []
    async for message in message_collection.find():
        messages.append(message_helper(message))
    return messages

# Retrieve all messages in a specific room by room id(rid)
async def retrieve_message(rid: str) -> dict:
    messages = []
    async for message in message_collection.find({"rid": rid}):
        messages.append(message_helper(message))
    return messages

# Retrieve all messages from a user by user id
async def retrieve_user_message(user: str) -> dict:
    messages = []
    async for message in message_collection.find({"u._id": user}):
        messages.append(message)
    return messages

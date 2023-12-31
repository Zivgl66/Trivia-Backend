const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const getRandomCode = require("../util/randomRoomCode");

/*  Create a Room scheme */
const roomsSchema = new Schema({
  hostId: { type: mongoose.Schema.Types.ObjectId, required: true },
  gameId: { type: mongoose.Schema.Types.ObjectId, required: true },
  roomCode: { type: String },
  isLive: { type: Boolean, default: false },
  playersList: [
    {
      guestId: { type: mongoose.Schema.Types.ObjectId },
      guestName: { type: String },
      guestPicture: { type: String },
    },
  ],
  date: { type: Date, default: Date.now },
  platerResultList: [{ type: mongoose.Schema.Types.ObjectId }],
});

// create a Collection of Rooms
const Rooms = mongoose.model("Rooms", roomsSchema);

//  Functions:
const createRoomCode = async () => {
  return await getRandomCode(Rooms);
};

//  Create a new Room:
const insertRoom = async (
  hostId,
  gameId,
  date,
  roomCode,
  isLive,
  playersList,
  playerResultList
) => {
  const room = new Rooms({
    hostId,
    gameId,
    date,
    roomCode,
    isLive,
    playersList,
    playerResultList,
  });
  return await room.save();
};

//  Find a Room:
const findRoomById = async (id) => {
  return await Rooms.findOne({ _id: id });
};

// Get a Room by room code
const findRoomByRoomCode = async (roomCode) => {
  return await Rooms.findOne({ roomCode });
};

//  Get all Rooms:
const getAllRooms = async () => {
  return await Rooms.find();
};

//  Check if a Room is open by id:
const checkIfRoomIsLive = async (id) => {
  const room = await Rooms.findOne({ _id: id });
  return room.isLive;
};

//  Add user to the Room: --If room is full, return -1
const addUserToTheRoom = async (roomCode, userId) => {
  const room = await Rooms.findOne({ roomCode });
  room.playersList.push({ guestName: "", guestPicture: "" });
  // console.log(room);
  return await room.save();
};

const updateUserList = async (id, newUser) => {
  await Rooms.findOneAndUpdate(
    { _id: id },
    { $set: { "playersList.$[el].guestName": newUser.guestName } },
    {
      arrayFilters: [
        {
          "el.guestName": "",
        },
      ],
      new: true,
    }
  );
  return await Rooms.findOneAndUpdate(
    { _id: id },
    { $set: { "playersList.$[el].guestPicture": newUser.guestPicture } },
    {
      arrayFilters: [
        {
          "el.guestPicture": "",
        },
      ],
      new: true,
    }
  );
};

const deleteRoom = async (roomId) => {
  return await Rooms.findByIdAndDelete({ _id: roomId });
};

module.exports = {
  Rooms,
  createRoomCode,
  findRoomById,
  findRoomByRoomCode,
  getAllRooms,
  insertRoom,
  checkIfRoomIsLive,
  addUserToTheRoom,
  deleteRoom,
  updateUserList,
};

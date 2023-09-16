const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*  Create a Room scheme */
const roomsSchema = new Schema({
  roomCode: { type: Number, required: true },
  isOpen: { type: Boolean, default: true },
  isFull: { type: Boolean, default: false },
  numberOfPlayers: { type: Number, required: true },
  users: { type: Array, required: false, default: [] },
});

// create a Collection of Rooms
const Rooms = mongoose.model("Rooms", roomsSchema);

//  Functions:

//  Create a new Room:
const insertRoom = (roomCode, isOpen, numberOfPlayers, users) => {
  const room = new Rooms({
    roomCode,
    isOpen,
    numberOfPlayers,
    users,
  });
  return room.save();
};

//  Find a Room:
const findRoomById = (id) => {
  return Rooms.findOne({ _id: id });
};

// Get a Room by room code
const findRoomByRoomCode = (roomCode) => {
  return Rooms.findOne(roomCode);
};

//  Get all Rooms:
const getAllRooms = () => {
  return Rooms.find();
};

//  Check if a Room is open by id:
const checkIfRoomIsOpen = (id) => {
  const room = Rooms.findOne({ _id: id });
  return room.isOpen;
};

//  Check if Room is full or not and return 0 if full or *Number* of free spots available -- return -1 if room is closed
const checkIfRoomIsFull = (id) => {
  const room = Rooms.findOne({ _id: id });
  if (room.isOpen) {
    let sum = users.length - numberOfPlayers;
    if (sum > 0) return sum;
    else return 0;
  } else return -1;
};

//  Add user to the Room: --If room is full, return -1
const addUserToTheRoom = (roomCode, user) => {
  const room = Rooms.findOne(roomCode);
  if (room.isFull) return -1;
  else {
    room.users.push(user);
    room.numberOfPlayers++;
  }
};

module.exports = {
  findRoomById,
  findRoomByRoomCode,
  getAllRooms,
  insertRoom,
  checkIfRoomIsOpen,
  checkIfRoomIsFull,
  addUserToTheRoom,
};

const express = require("express");
const router = express.Router();
const roomsModule = require("../../models/rooms.model");
const adminMiddelaware = require("../../middelware/admin.middelware");

// --GET-- request gets all the rooms there are
router.get("/", async (req, res) => {
  try {
    const rooms = await roomsModule.getAllRooms();
    res.json({
      rooms,
      message: "All Rooms",
      status: "success",
    });
  } catch (err) {
    console.error("error getting all the rooms: ", err);
  }
});

// --POST-- request crates a new room with the provided host id and game id
router.post("/", async (req, res) => {
  try {
    console.log("req" + req.body);
    const randomCode = await roomsModule.createRoomCode();
    const room = {
      hostId: req.body.hostId,
      gameId: req.body.gameId,
      date: new Date().toISOString(),
      roomCode: randomCode,
      isLive: true,
      playerList: [],
      playerResultList: [],
    };
    const newRoom = await roomsModule.insertRoom(
      room.hostId,
      room.gameId,
      room.date,
      room.roomCode,
      room.isLive,
      room.playerList,
      room.playerResultList
    );
    res.json({
      room: newRoom,
      message: "Room created successfully",
      status: "success",
    });
  } catch (err) {
    console.error("error creating the room: ", err);
  }
});

// --POST-- let user enter room if exists
router.post("/enterroom", async (req, res) => {
  try {
    const roomData = await roomsModule.findRoomByRoomCode(req.body.roomCode);
    console.log("room data: ", roomData);
    if (!roomData) {
      res.json({ message: "Room doesnt exists" }).status(401);
    } else {
      let spotOfPlayer = roomData.playersList.length;
      const room = await roomsModule.addUserToTheRoom(
        roomData.roomCode,
        req.body
      );
      console.log("added user" + room);
      res.json({
        status: "success",
        message: `${req.body.userId} Enterd Room`,
        room: room,
        userId: room.playersList[spotOfPlayer]._id,
      });
    }
  } catch (err) {
    console.error("error: " + err);
  }
});

// --GET-- get a room by its id
router.get("/:roomId", async (req, res) => {
  try {
    const roomData = await roomsModule.findRoomById(req.params.roomId);
    if (!roomData) res.json({ message: "Room doesnt exists" }).status(401);
    else
      res.json({
        status: "success",
        message: "Rooms Exists",
        room: roomData,
      });
  } catch (err) {
    console.error("error: " + err);
  }
});

// --POST-- Delete a room by its id
router.post("/deleteroom/:roomId", async (req, res) => {
  try {
    let deleted = await roomsModule.deleteRoom(req.params.roomId);
    if (deleted)
      res.json({
        status: "success",
        message: "Rooms Deleted",
        room: deleted,
      });
    else res.json({ message: "room not found!" }).status(304);
  } catch (err) {
    console.log(err);
    res.json(err).status(401);
  }
});

module.exports = router;

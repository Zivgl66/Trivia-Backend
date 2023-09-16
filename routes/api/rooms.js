const express = require("express");
const router = express.Router();
const roomsModule = require("../../models/rooms.model");
const roomsValidation = require("../../validation/rooms.validation");

//  --POST-- Add a New Room
router.post("/", async (req, res) => {
  try {
    const validatedValue = await roomsValidation.validateRoomSchema(req.body);
    const roomData = await roomsModule.findRoomByRoomCode(
      validatedValue.roomCode
    );
    console.log(roomData);
    if (roomData) {
      res.json({ message: "Room already exists" }).status(401);
    } else {
      const newRoom = await roomsModule.insertRoom(
        validatedValue.roomCode,
        validatedValue.isOpen,
        validatedValue.isFull,
        validatedValue.numberOfPlayers,
        validatedValue.users
      );
      res.json({ status: "success", message: "Room Created" });
    }
  } catch (err) {
    console.error("error creating the room: ", err);
    res.json(err);
  }
});

// --GET-- Get all Rooms
router.get("/allrooms", async (req, res) => {
  try {
    const roomsData = await roomsModule.getAllRooms();
    console.log("rooms data: ", roomsData);
    if (roomsData.length > 0) res.json(roomsData).status(200);
    else res.json({ message: "No Rooms Found" }).status(401);
  } catch (err) {
    console.log("error getting all rooms: ", err);
  }
});

// --POST-- let user enter room if exist and not full
router.post("/enterroom", async (req, res) => {
  try {
    console.log(req.body.roomCode);
    const roomData = await roomsModule.findRoomByRoomCode(req.body);
    console.log("room data: ", roomData);
    if (!roomData) {
      res.json({ message: "Room doesnt exists" }).status(401);
    } else if (roomData.isFull) {
      res.json({ message: "Room is full" }).status(401);
    } else {
      res.json({ status: "success", message: "Enterd Room" });
    }
  } catch (err) {
    console.error("error: " + err);
  }
});
module.exports = router;

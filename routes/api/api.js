const express = require("express");
const router = express.Router();
const usersRouter = require("./users");
const roomsRouter = require("./rooms");
const guestsRouter = require("./guest");

//http://localhost:3001/api/users
router.use("/users", usersRouter);

//http://localhost:3001/api/guests
router.use("/guests", guestsRouter);

//http://localhost:3001/api/rooms
router.use("/rooms", roomsRouter);

module.exports = router;

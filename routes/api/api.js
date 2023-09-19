const express = require("express");
const router = express.Router();
const usersRouter = require("./users");
const roomsRouter = require("./rooms");

//http://localhost:3001/api/users
router.use("/users", usersRouter);

//http://localhost:3001/api/rooms
router.use("/rooms", roomsRouter);

module.exports = router;

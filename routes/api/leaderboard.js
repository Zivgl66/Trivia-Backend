const express = require("express");
const router = express.Router();
const leaderboardModule = require("../../models/leaderBoard.module");
const roomsModule = require("../../models/rooms.model");
const gamesModule = require("../../models/games.module");

//--POST-- Create a leaderboard
router.post("/", async (req, res) => {
  try {
    let roomId = req.body.newLeaderboard.roomId;
    // console.log("room id array ", req.body.newLeaderboard[0].roomId);
    const roomData = await roomsModule.findRoomById(roomId);
    // console.log("room data: ", roomData);
    const gameData = await gamesModule.getGameById(roomData.gameId);
    // console.log("game data: ", gameData);
    const newLeaderboard = await leaderboardModule.createLeaderBoard(
      roomId,
      gameData,
      req.body.newLeaderboard.playerResultList
    );
    res.json({
      leaderboard: newLeaderboard,
      message: "New leaderboard created",
      status: "success",
    });
  } catch (err) {
    console.error("error creating a leaderboard: ", err);
    res.json(err).status(401);
  }
});

module.exports = router;

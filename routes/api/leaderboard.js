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

router.post("/:id/questionleaderboard", async (req, res) => {
  const { id } = req.params;
  const { questionIndex, playerId, playerPoints } = req.body.questionResult;
  console.log(
    "question index and stuff: ",
    questionIndex,
    playerId,
    playerPoints
  );
  try {
    let leaderboard = await leaderboardModule.getLeaderBoardById(id);
    console.log("leaderboard found: ", leaderboard);
    const newLeaderboard = await leaderboardModule.updateLeaderboard(
      leaderboard[0],
      questionIndex,
      playerId,
      playerPoints
    );
    res.json({
      leaderboard: newLeaderboard,
      message: "Leaderboard updated",
      status: "success",
    });
  } catch (err) {
    console.error("error updating question leaderboard: ", err);
    res.json(err).status(401);
  }
});

router.post("/:id/currentleaderboard", async (req, res) => {
  const { id } = req.params;
  const { questionIndex, playerId, playerCurrentScore } = req.body.result;
  try {
    let leaderboard = await leaderboardModule.getLeaderBoardById(id);
    const newLeaderboard = await leaderboardModule.updateCurrentLeaderboard(
      leaderboard[0],
      questionIndex,
      playerId,
      playerCurrentScore
    );
    res.json({
      leaderboard: newLeaderboard,
      message: "Leaderboard updated",
      status: "success",
    });
  } catch (err) {
    console.error("error updating question leaderboard: ", err);
    res.json(err).status(401);
  }
});

module.exports = router;

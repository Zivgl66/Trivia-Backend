const express = require("express");
const router = express.Router();
const playerResultsModule = require("../../models/playerResult.module");
const roomsModule = require("../../models/rooms.model");
const gamesModule = require("../../models/games.module");

// --GET-- get a players results
router.get("/", async (req, res) => {
  try {
    const playerResults = await playerResultsModule.getAllPlayersResults();
    res.json({
      playerResults,
      message: "All Player Results",
      status: "success",
    });
  } catch (err) {
    console.error("error getting all the players results: ", err);
    res.json(err).status(401);
  }
});

// --POST-- create a new player result
router.post("/", async (req, res) => {
  try {
    console.log("api:   " + JSON.stringify(req.body));
    const newPlayerResultN = await playerResultsModule.createPlayerResult(
      req.body.newPlayerResult.playerId,
      req.body.newPlayerResult.roomId,
      req.body.newPlayerResult.score,
      req.body.newPlayerResult.answers
    );
    res.json({
      playerResult: newPlayerResultN,
      message: "New player result created",
      status: "success",
    });
  } catch (err) {
    console.error("error creating players results: ", err);
    res.json(err).status(401);
  }
});

//--GET-- get a player result by id
router.get("/:id", async (req, res) => {
  try {
    const playerResultFound = await playerResultsModule.getPlayerResultById(
      req.params.id
    );
    console.log("player result found: " + playerResultFound);
    if (!playerResultFound)
      res.json({ message: "player result not found" }).status(401);
    else
      res.json({
        status: "success",
        message: "Player results Found",
        playerResult: playerResultFound,
      });
  } catch (err) {
    console.error("error getting the players results: ", err);
    res.json(err).status(401);
  }
});

//--POST-- Delete a players result
router.post("/:id", async (req, res) => {
  try {
    let deleted = await playerResultsModule.deletePlayersResults(req.params.id);
    if (deleted)
      res.json({
        status: "success",
        message: "Player result Deleted",
        playerResult: deleted,
      });
    else res.json({ message: "player result not found!" }).status(304);
  } catch (err) {
    console.error("error deleting the players results: ", err);
    res.json(err).status(401);
  }
});

//--GET-- get  all answers of a player result
router.get("/:playerResultId/answers", async (req, res) => {
  try {
    const playerResultAnswers = await playerResultsModule.getAnswers(
      req.params.playerResultId
    );
    if (!playerResultAnswers)
      res.json({ message: "player result answers not found!" }).status(304);
    else
      res.json({
        status: "success",
        message: "Player result answers",
        answers: playerResultAnswers,
      });
  } catch (err) {
    console.error("error getting questions of a players result: ", err);
    res.json(err).status(401);
  }
});

//--POST-- add  an answer to a player result
// router.post("/:playerResultId/answers", async (req, res) => {
//   try {
//     const newPlayerResult = await playerResultsModule.addAnswer(
//       req.params.playerResultId,
//       req.body.newAnswer
//     );
//     if (!newPlayerResult)
//       res
//         .json({ message: "new answer was not added to the player result!" })
//         .status(304);
//     else
//       res.json({
//         status: "success",
//         message: "new question added",
//         playerResult: newPlayerResult,
//       });
//   } catch (err) {
//     console.error("error adding question to a players result: ", err);
//     res.json(err).status(401);
//   }
// });

router.post("/:playerResultId/answers", async (req, res) => {
  try {
    const playerResultData = await playerResultsModule.getPlayerResult(
      req.params.playerResultId
    );
    // console.log("player result found:" + JSON.stringify(playerResultData));
    // console.log("player result found:" + playerResultData[0].id);
    // console.log("player result found:" + playerResultData[0]._id);
    // console.log("player result found:" + playerResultData[0].roomId);
    // console.log("player result found:" + playerResultData);
    const roomData = await roomsModule.findRoomById(playerResultData[0].roomId);
    // console.log("room found:" + roomData);
    const gameData = await gamesModule.getGameById(roomData.gameId);
    // console.log("game found:" + gameData);
    const newPlayerResult = await playerResultsModule.addAnswer(
      playerResultData[0],
      gameData,
      req.body.newAnswer
    );
    // console.log("updated player result : " + newPlayerResult);
    if (!newPlayerResult)
      res
        .json({ message: "new answer was not added to the player result!" })
        .status(304);
    else
      res.json({
        status: "success",
        message: "new question added",
        playerResult: newPlayerResult,
      });
  } catch (err) {
    console.error("error adding question to a players result: ", err);
    res.json(err).status(401);
  }
});

//--GET--
router.get("/:playerResultId/answers/:answerId", async (req, res) => {
  try {
    const updatedPlayerResult = await playerResultsModule.deleteAnswer(
      req.params.playerResultId,
      req.params.answerId
    );
    if (!updatedPlayerResult)
      res
        .json({ message: "no answer or player result was found!" })
        .status(304);
    else
      res.json({
        status: "success",
        message: "Deleted answer from a player result",
        playerResult: updatedPlayerResult,
      });
  } catch (err) {
    console.error("error deleting question of a players result: ", err);
    res.json(err).status(401);
  }
});

module.exports = router;

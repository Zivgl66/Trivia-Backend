const express = require("express");
const router = express.Router();
const playerResultsModule = require("../../models/playerResult.module");

// --GET-- get a players results
router.get("/", async (req, res) => {
  try {
    const playerResults = await playerResultsModule.getAllPlayerResults();
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
    const newPlayerResult = await playerResultsModule.createPlayerResult({
      playerId: req.body.playerId,
      roomId: req.body.roomId,
      score: req.body.score,
      answers: req.body.answers,
    });
    res.json({
      playerResult: newPlayerResult,
      message: "New player result created",
      status: "success",
    });
  } catch (err) {
    console.error("error getting all the players results: ", err);
    res.json(err).status(401);
  }
});

//--GET-- get a player result by id
router.get("/:id", async (req, res) => {
  try {
    const playerResult = await playerResultsModule.getPlayerResultById(
      req.params.id
    );
    if (!playerResult)
      res.json({ message: "player result not found" }).status(401);
    else
      res.json({
        status: "success",
        message: "Player results Found",
        playerResult,
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
router.post("/:playerResultId/answers", async (req, res) => {
  try {
    const newPlayerResult = await playerResultsModule.addAnswer(
      req.params.playerResultId,
      req.body.newAnswer
    );
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

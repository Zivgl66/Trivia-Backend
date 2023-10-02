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

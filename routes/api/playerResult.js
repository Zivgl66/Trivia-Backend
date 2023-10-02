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

const express = require("express");
const router = express.Router();
const gamesModule = require("../../models/games.module");

// --GET-- get all games
router.get("/", async (req, res) => {
  try {
    const games = await gamesModule.getAllGames();
    res.json({
      games,
      message: "All Games",
      status: "success",
    });
  } catch (err) {
    console.error("error getting all the rooms: ", err);
  }
});

// --POST-- create a new game
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const newGame = await gamesModule.createGame({
      name: req.body.name,
      description: req.body.description,
      backgroundImage: req.body.backgroundImage,
      creatorId: req.body.creatorId,
      creatorName: req.body.creatorName,
      questionList: req.body.questionList,
    });
    res.json({
      game: newGame,
      message: "New Game Created",
      status: "success",
    });
  } catch (err) {
    console.error("error creating the game: ", err);
  }
});

// --GET-- get game by its id from params
router.get("/:gameId", async (req, res) => {
  try {
    const gameData = await gamesModule.getGameById(req.params.gameId);
    if (!gameData) res.json({ message: "Game doesnt exists" }).status(401);
    else
      res.json({
        status: "success",
        message: "Game Found",
        game: gameData,
      });
  } catch (err) {
    console.error("error: " + err);
  }
});

// --GET-- get all games of a user by his id from params
router.get("/usergames/:userId", async (req, res) => {
  try {
    const gamesData = await gamesModule.getUserGames(req.params.userId);
    if (!gamesData) res.json({ message: "User has no Games" }).status(401);
    else
      res.json({
        status: "success",
        message: "user Games Found",
        games: gamesData,
      });
  } catch (err) {
    console.error("error: " + err);
  }
});

// --POST-- delete a game by its id in params
router.post("/deletegame/:gameId", async (req, res) => {
  try {
    let deleted = await gamesModule.deleteGameById(req.params.gameId);
    if (deleted)
      res.json({
        status: "success",
        message: "Game Deleted",
        game: deleted,
      });
    else res.json({ message: "game not found!" }).status(304);
  } catch (err) {
    console.error("error: " + err);
    res.json(err).status(401);
  }
});

// --POST-- add a question to a game
router.post("/addquestion", async (req, res) => {
  try {
    const game = await gamesModule.getGameById(req.body.gameId);
    if (!game) res.json({ message: "game not found!" }).status(304);
    else {
      const newGame = await gamesModule.addQuestion(game, req.body.question);
      res.json({ status: "success", game: newGame, message: "question added" });
    }
  } catch (err) {
    console.error("error: " + err);
    res.json(err).status(401);
  }
});

//--GET-- get all of a game questions by params game id
router.get("/questions/:gameId", async (req, res) => {
  try {
    const gameQuestions = await gamesModule.getGameQuestionList(
      req.params.gameId
    );
    if (!gameQuestions) res.json({ message: "game not found!" }).status(304);
    else
      res.json({
        status: "success",
        questions: gameQuestions,
        message: "game questions found",
      });
  } catch (err) {
    console.error("error: " + err);
    res.json(err).status(401);
  }
});

//--POST-- change all of a game questions list
router.post("/question/", async (req, res) => {
  try {
    const newGame = await gamesModule.updateQuestions(
      req.body.gameId,
      req.body.newQuestionsList
    );
    if (!newGame) res.json({ message: "game not found!" }).status(304);
    else
      res.json({
        status: "success",
        game: newGame,
        message: "game questions were updated",
      });
  } catch (err) {
    console.error("error: " + err);
    res.json(err).status(401);
  }
});

module.exports = router;

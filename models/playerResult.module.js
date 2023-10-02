const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Rooms = require("./rooms.model");
const Games = require("./game.module");

const playerResultSchema = new Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  score: {
    Number,
  },
  answers: [
    {
      questionIndex: { type: Number },
      answered: {
        type: Boolean,
        default: false,
      },
      answers: [{ type: String }],
      points: {
        type: Number,
        default: 0,
      },
    },
  ],
});

// create a Collection of Rooms
const PlayerResults = mongoose.model("PlayerResults", playerResultSchema);

//  Functions:

// create a new player result in the db
const createPlayerResult = async (playerId, roomId, score, answers) => {
  const newPlayerResult = new PlayerResults({
    playerId,
    roomId,
    score,
    answers,
  });
  return await newPlayerResult.save();
};

//get a player result by id
const getPlayerResultById = async (playerId) => {
  return await PlayerResults.find({ playerId });
};

//get all players results
const getAllPlayersResults = async () => {
  return await PlayerResults.find();
};

//delete a players results
const deletePlayersResults = async (id) => {
  return await findByIdAndDelete({ _id: id });
};

//update a players result
// const updatePlayersResult = async (id, newResult) => {};

//add answer
const addAnswer = async (playerResultId, newAnswer) => {
  let points = 0;
  const playerResult = await PlayerResults.find({ _id: playerResultId });
  const room = await Rooms.find({ _id: playerResult.roomId });
  const game = await Games.find({ _id: room.gameId });
  let correctAnswers = game.questionList[questionIndex - 1].answerList
    .filter((answer) => answer.isCorrect === true)
    .map((answer) => answer.name);
  let sortedAnswers = newAnswer.answers.sort();
  if (answers.length > 0) {
    let a = 0;
    for (let i = 0; i < correctAnswers.length; i++) {
      if (correctAnswers[i] === sortedAnswers[i]) a++;
    }
    if (a === correctAnswers.length) points++;
    playerResult.score += points;
    playerResult.answers.push({
      questionIndex,
      answers,
      correctAnswers,
      points,
    });
    return await playerResult.save();
  }
};

// get answers
const getAnswers = async (playerResultId) => {
  const playerResult = await PlayerResults.find({ _id: playerResultId });
  if (!playerResult) return null;
  else return playerResult.answers;
};

//delete answer
const deleteAnswer = async (playerResultId, answerId) => {
  const playerResult = await PlayerResults.find({ _id: playerResultId });
  let answerIndex = playerResult.answers.findIndex(
    (answers) => answers._id == answerId
  );
  playerResult.answers.splice(answerIndex, 1);
  playerResult.score -= playerResult.answers[answerIndex].points;
  return PlayerResults.findByIdAndUpdate(playerResultId, playerResult, {
    new: true,
  });
};

// //get answer
// const getAnswer = async (playerResultId, answerId) => {
//   const playerResult = await PlayerResults.find({ _id: playerResultId });
//   if (!playerResult) return null;
//   else return playerResult.answers.find()
// };

//update answer
// const updateAnswer = async (playerResultId) => {};

module.exports = {
  createPlayerResult,
  getPlayerResultById,
  getAllPlayersResults,
  deletePlayersResults,
  addAnswer,
  getAnswers,
  deleteAnswer,
};

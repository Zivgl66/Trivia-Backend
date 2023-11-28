const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*  Create a Room scheme */
const gamesSchema = new Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  backgroundImage: { type: String },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  creatorName: { type: String },
  numberOfQuestions: {
    type: Number,
    default: 0,
  },
  questionList: [
    {
      questionType: {
        type: String,
        enum: ["Options", "FreeText", "True/False"],
        required: true,
      },
      isManagerFirst: {
        type: Boolean,
        required: true,
      },
      // pointType: {
      //   type: String,
      //   enum: ["Standard", "Double", "BasedOnTime"],
      //   required: true,
      // },
      answerTime: {
        type: Number,
        min: 5,
        max: 90,
      },
      backgroundImage: { type: String, required: false },
      video: { type: String, required: false },
      question: {
        type: String,
        required: true,
      },
      answerList: [
        {
          name: { type: String },
          body: { type: String },
          isCorrect: { type: Boolean },
        },
      ],
      questionIndex: { type: Number, required: true },
    },
  ],
  dateCreated: { type: Date, default: new Date() },
});

// create a Collection of Rooms
const Games = mongoose.model("Games", gamesSchema);

//Functions:

//create a new game and save to db
const createGame = async (
  name,
  description,
  backgroundImage,
  creatorId,
  creatorName,
  questionList,
  numberOfQuestions
) => {
  // console.log("question list: " + name);
  const game = new Games({
    name,
    description,
    backgroundImage,
    creatorId,
    creatorName,
    questionList,
    numberOfQuestions,
    dateCreated: new Date().toISOString(),
  });
  return await game.save();
};

// return all games
const getAllGames = async () => {
  return await Games.find();
};

// retuen all games from the same user
const getUserGames = async (userId) => {
  return await Games.find({ creatorId: userId });
};

// get a game by its id
const getGameById = async (gameId) => {
  return await Games.findOne({ _id: gameId });
};

// delete a game from db by its id
const deleteGameById = async (gameId) => {
  return await Games.findByIdAndDelete({ _id: gameId });
};

// add question to a game
const addQuestion = async (game, question) => {
  game.questionList.push(question);
  game.numberOfQuestions += 1;
  return await game.save();
};
// const addQuestion = async (gameId, question) => {
//   const game = await Games.findOne({ _id: gameId });
//   if (!game) return;
//   else {
//     game.questionList.push(question);
//     game.numberOfQuestions += 1;
//     return await game.save();
//   }
// };

// get a game questions list
const getGameQuestionList = async (gameId) => {
  return await Games.findOne({ _id: gameId }).questionList;
};

// //  get a question from a game by its id
// const getQuestionById = async (gameId, questionId) => {
//   const game = await Games.findOne({ _id: gameId });
//   if (!game) return;
//   else {
//     const question = game.questionList.find((question) => {});
//   }
// };

// update an entire questions list of a game
const updateQuestions = async (gameId, newQuestionList) => {
  const game = await Games.findOne({ _id: gameId });
  if (!game) return;
  else {
    game.questionList = newQuestionList;
    game.numberOfQuestions = newQuestionList.length;
    return await game.save();
  }
};

module.exports = {
  Games,
  createGame,
  getAllGames,
  getUserGames,
  getGameById,
  deleteGameById,
  addQuestion,
  getGameQuestionList,
  updateQuestions,
};

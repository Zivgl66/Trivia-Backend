const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const leaderBoardSchema = new Schema({
  roomId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  playerResultList: [
    {
      type: mongoose.Schema.Types.ObjectId,
    },
  ],
  questionLeaderboard: [
    {
      questionIndex: { type: Number },
      questionResultList: [
        {
          playerId: {
            type: mongoose.Schema.Types.ObjectId,
          },
          playerPoints: { type: Number },
        },
      ],
    },
  ],
  currentLeaderboard: [
    {
      questionIndex: { type: Number },
      leaderboardList: [
        {
          playerId: {
            type: mongoose.Schema.Types.ObjectId,
          },
          playerCurrentScore: { type: Number },
        },
      ],
    },
  ],
});

// create a Collection of Rooms
const LeaderBoard = mongoose.model("LeaderBoard", leaderBoardSchema);

//FUNCTIONS:

//create a new leaderboard
const createLeaderBoard = async (roomId, gameData, platerResultList) => {
  const leaderBoard = new LeaderBoard({
    roomId,
    platerResultList,
  });

  gameData.questionList.forEach((question) => {
    leaderBoard.questionLeaderboard.push({
      questionIndex: question.questionIndex,
      questionResultList: [],
    });
    leaderBoard.currentLeaderboard.push({
      questionIndex: question.questionIndex,
      leaderboardList: [],
    });
  });
  return leaderBoard.save();
};
const getLeaderBoardById = async (id) => {
  return await LeaderBoard.find({ _id: id }).lean();
};

const updateLeaderboard = async (
  oldLeaderboard,
  questionIndex,
  playerId,
  playerPoints
) => {
  // console.log(
  //   "leaderBoard to update",
  //   oldLeaderboard.questionLeaderboard[0]
  // );
  oldLeaderboard.questionLeaderboard[
    questionIndex - 1
  ].questionResultList.push({
    playerId,
    playerPoints,
  });
  return await LeaderBoard.findByIdAndUpdate(
    oldLeaderboard._id,
    oldLeaderboard,
    {
      new: true,
    }
  );
};

const updateCurrentLeaderboard = async (
  leaderboard,
  questionIndex,
  playerId,
  playerCurrentScore
) => {
  leaderboard.currentLeaderboard[questionIndex - 1].leaderboardList.push({
    playerId,
    playerCurrentScore,
  });
  return await LeaderBoard.findByIdAndUpdate(leaderboard._id, leaderboard, {
    new: true,
  });
};

module.exports = {
  createLeaderBoard,
  getLeaderBoardById,
  updateLeaderboard,
  updateCurrentLeaderboard,
};

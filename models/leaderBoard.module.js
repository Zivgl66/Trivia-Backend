const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Rooms = require("./rooms.model");
const Games = require("./game.module");

const leaderBoardSchema = new Schema({
  gameId: {
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
const createLeaderBoard = async (roomId, platerResultList) => {
  let room = await Rooms.findRoomById(roomId);
  let game = await Games.getGameById(room.gameId);
  const leaderBoard = new LeaderBoard({
    roomId,
    platerResultList,
  });

  game.questionList.forEach((question) => {
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

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



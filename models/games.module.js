const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gamesSchema = new Schema({
  gameName: { type: String, required: true },
  questions: { type: Array, required: true },
});

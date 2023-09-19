const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/*  Create a Room scheme */
const questionsSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  question: { type: Object, required: true },
  options: { type: Array },
  answer: { type: String, required: true },
});

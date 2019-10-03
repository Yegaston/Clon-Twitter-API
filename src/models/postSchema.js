const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: String,
  date: { type: Date, default: Date.now },
  body: String,
  meta: {
    likes: Number,
    clicks: Number
  }
});
module.exports = mongoose.model("Post", postSchema);

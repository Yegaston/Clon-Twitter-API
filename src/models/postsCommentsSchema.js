const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: String,
  postId: String,
  date: { type: Date, default: Date.now },
  body: String,
  meta: {
    likes: Number,
    clicks: Number
  }
});
module.exports = mongoose.model("Comments", commentSchema);

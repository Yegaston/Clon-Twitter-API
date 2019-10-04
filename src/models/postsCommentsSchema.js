const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: String,
  postId: String,
  date: { type: Date, default: Date.now },
  body: String,
  meta: {
    likes: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 }
  }
});
module.exports = mongoose.model("Comments", commentSchema);

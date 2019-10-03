const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  author: String,
  date: { type: Date, default: Date.now },
  body: String,
  commentsId: { type: Array, default: undefined },
  meta: {
    likes: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 }
  }
});
module.exports = mongoose.model("Post", postSchema);

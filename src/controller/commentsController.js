const Comment = require("../models/postsCommentsSchema");
const Post = require("../models/postSchema");

module.exports = {
  newComment: async (req, res, next) => {
    const { postId } = req.params;
    const { body, author } = req.body;
    const comment = { postId, body, author };
    const newComment = new Comment(comment);

    try {
      const postToComment = await Post.findById(postId);

      if (postToComment === null) {
        return res
          .status(400)
          .json({ PostDontExist: "Post dont exist, can comment" });
      } else {
        if (body && author) {
          const r = await newComment.save(comment);
          const commentId = { commentId: r._id };

          const postEdited = await Post.update(
            { _id: postId },
            { $push: { commentsId: commentId } }
          );

          return res.status(200).json(postEdited);
        } else {
          return res.status(400).json({ erorr: "Body, author missing" });
        }
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
};

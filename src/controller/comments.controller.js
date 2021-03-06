const Comment = require("../models/postsCommentsSchema");
const Post = require("../models/postSchema");

module.exports = {
  // TODO Get one or multiples comments from a array and returned it
  newComment: async (req, res, next) => {
    const { postId } = req.params;
    const { body } = req.body;
    const { username } = res.locals.userData;
    const author = username;
    const comment = { postId, body, author };
    const newComment = new Comment(comment);

    try {
      const postToComment = await Post.findById(postId);

      if (postToComment === null) {
        return res
          .status(400)
          .json({ PostDontExist: "Post dont exist, can comment" });
      } else if (body && author) {
        const r = await newComment.save(comment);
        const commentId = { commentId: r._id };

        const _ = await Post.updateOne(
          { _id: postId },
          { $push: { commentsId: commentId } }
        );

        return res.status(201).json(r);
      } else {
        return res.status(400).json({ clientError: "Body, author missing" });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json(error);
    }
  }
};

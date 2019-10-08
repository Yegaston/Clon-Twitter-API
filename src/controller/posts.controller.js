const Post = require("../models/postSchema");
const Comment = require("../models/postsCommentsSchema");
module.exports = {
  createPost: async (req, res, next) => {
    const { username } = res.locals.userData;
    const { body } = req.body;
    const newPost = new Post({ body, author: username });
    if (req.body.body.length <= 0) {
      res.status(400).json({ error: "Bad post" });
    } else {
      try {
        const user = await newPost.save();
        res.status(201).json(user);
        res.end();
      } catch (error) {
        console.error(error);
        res.status(400).json(error);
        res.end();
      }
    }
  },

  getAllPosts: async (req, res, next) => {
    try {
      const posts = await Post.find();
      if (posts.length === 0) {
        return await res.status(200).json({ collection: "empty" });
      }

      let postsFormatted = [];
      posts.map(post => {
        let comments = [];
        if (post.commentsId) {
          post.commentsId.forEach(async i => {
            const c = await Comment.findById(i.commentId);
            comments.push(c);
          });
          console.log(comments);
        }

        // console.log(comments);
        const toPush = { post: post, comments: comments };
        // console.log(toPush);
        postsFormatted.push(toPush);
      });

      return res.status(200).json(posts);
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  },

  getOnePost: async (req, res, next) => {
    const { id } = req.params;

    try {
      const post = await Post.find({ _id: id });
      if (post.length === 0) {
        return await res.status(200).json({ postDoestExist: id });
      }
      return res.status(200).json(post);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  deleteOnePost: async (req, res, next) => {
    const { id } = req.params;

    try {
      console.log(id);
      const response = await Post.findByIdAndDelete(id);
      if (response === null) {
        return res.status(200).json({ postDoestExist: id });
      }
      return res.status(200).json({ postDelete: response._id });
    } catch (error) {
      console.log(error);
      return res.status(500).json(error);
    }
  }
};

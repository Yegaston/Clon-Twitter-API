const Post = require("../models/postSchema");

module.exports = {
  createPost: async (req, res, next) => {
    const newPost = new Post(req.body);
    if (req.body.body.length <= 0) {
      res.status(400).json({ error: "Bad post" });
      res.end();
    }
    try {
      const user = await newPost.save();
      res.status(201).json(user);
      res.end();
    } catch (error) {
      console.error(error);
      res.status(400).json(error);
      res.end();
    }
  },

  getAllPosts: async (req, res, next) => {
    try {
      const posts = await Post.find();
      if (posts.length === 0) {
        return await res.status(200).json({ collection: "empty" });
      }
      return res.status(200).json(posts);
    } catch (error) {
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
  }
};

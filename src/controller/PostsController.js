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
  }
};

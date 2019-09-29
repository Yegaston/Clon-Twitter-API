const Post = require("../models/postSchema");

module.exports = {
  createPost: async (req, res, next) => {
    const newPost = new Post(req.body);
    if (req.body.body === "") {
      return res.status(400).json({ error: "Bad post" });
    }
    try {
      const user = await newPost.save();
      return res.status(201).json(user);
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  }
};

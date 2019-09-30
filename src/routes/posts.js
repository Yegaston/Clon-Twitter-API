const express = require("express");
const {
  createPost,
  getAllPosts,
  getOnePost
} = require("../controller/PostsController");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Hola");
  res.end();
});

router.get("/posts", getAllPosts);
router.get("/post/:id", getOnePost);
router.post("/post", createPost);

module.exports = router;

const express = require("express");
const {
  createPost,
  getAllPosts,
  getOnePost,
  deleteOnePost
} = require("../controller/posts.controller");
const isValid = require("../controller/auth/isAuthMiddleware");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Hola");
  res.end();
});

router.get("/posts", getAllPosts);
router.get("/post/:id", getOnePost);
router.post("/post", isValid, createPost);
router.delete("/post/:id", deleteOnePost);

module.exports = router;

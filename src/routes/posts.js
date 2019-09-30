const express = require("express");
const { createPost } = require("../controller/PostsController");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Hola");
  res.end();
});

router.post("/post", createPost);

module.exports = router;

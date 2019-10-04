const express = require("express");
const router = express.Router();
const { newComment } = require("../controller/comments.controller");

router.post("/:postId", newComment);
module.exports = router;

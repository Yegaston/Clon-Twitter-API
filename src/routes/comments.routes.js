const express = require("express");
const router = express.Router();
const isValid = require("../controller/auth/isAuthMiddleware");

const { newComment } = require("../controller/comments.controller");

router.post("/:postId", isValid, newComment);
module.exports = router;

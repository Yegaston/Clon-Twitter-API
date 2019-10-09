const router = require("express").Router();
const {
  registerNewUser,
  loginUser
} = require("../controller/auth/auth.controller");
router.post("/register", registerNewUser);
router.post("/login", loginUser);
module.exports = router;

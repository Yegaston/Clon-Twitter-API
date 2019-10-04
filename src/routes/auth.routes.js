const router = require("express").Router();
const { registerNewUser } = require("../controller/auth/auth.controller");
router.post("/register", registerNewUser);

module.exports = router;

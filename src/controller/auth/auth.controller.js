const User = require("../../models/userModel");
const { encryptPassword } = require("./crypt");
const { createToken } = require("./jwt");
module.exports = {
  registerNewUser: async (req, res, next) => {
    const { email, password, username } = req.body;
    try {
      const hash = await encryptPassword(password);

      const e = await User.findOne({ email });
      const u = await User.findOne({ username });
      if (e && u) {
        return res
          .status(400)
          .json({ error: "Email and Username is already taken" });
      } else if (e) {
        return res.status(400).json({ error: "Email is already taken" });
      } else if (u) {
        return res.status(400).json({ error: "Username is already taken" });
      } else {
        const token = await createToken(email, username);
        const newUser = new User({ email, username, hash, token });
        const r = await newUser.save();
        console.log(token);

        return res.status(201).json(r);
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  }
};
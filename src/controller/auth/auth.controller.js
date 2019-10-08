const User = require("../../models/userModel");
const { encryptPassword, comparePassword } = require("./crypt");
const { createToken, validateToken } = require("./jwt");
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
        return res.status(201).json(r);
      }
    } catch (error) {
      console.error(error);
      return res.status(400).json(error);
    }
  },

  loginUser: async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (email && password) {
      if (user) {
        const { hash, token, _id, username } = user;
        const ifPassValid = await comparePassword(password, hash);
        if (ifPassValid) {
          const decodedToken = await validateToken(token);
          if (decodedToken.message === "jwt expired") {
            // El token expiro
            const newToken = await createToken(email, username);
            User.findOneAndUpdate({ _id }, { token: newToken });
            const decodedNewToken = await validateToken(newToken);
            return res
              .status(200)
              .json({ newToken, decodedToken: decodedNewToken });
          } else {
            return res.status(200).json({ token, decodedToken });
          }
        } else {
          return res.status(401).json({ error: "Wrong credentials." });
        }
      } else {
        return res.status(401).json({ error: "Wrong credentials." });
      }
    } else {
      return res.status(400).json({ error: "Missing params" });
    }
  }
};
  
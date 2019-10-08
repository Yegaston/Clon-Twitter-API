const { validateToken } = require("./jwt");

module.exports = async (req, res, next) => {
  var token = req.headers.authorization;

  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
      const decodedToken = await validateToken(token);
      if (decodedToken.message) {
        if (decodedToken.message === "jwt expired") {
          return res
            .status(401)
            .json({ tokenExpired: "The token is expired}" });
        }

        return res.status(400).json(decodedToken);
      } else {
        res.locals.userData = decodedToken.userData;
        next();
      }
    } else {
      res.status(401).json({ Unauthorized: "Token dont valid" });
    }
  } else {
    res.status(401).json({ Unauthorized: "Token doesnt exist" });
  }
};

const jwt = require("jsonwebtoken");

module.exports = {
  createToken: async (email, username) => {
    try {
      return await jwt.sign(
        {
          userData: {
            email,
            username
          }
        },
        "secretKey",
        { expiresIn: "30d" }
      );
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  validateToken: async token => {
    try {
      return await jwt.verify(token, "secretKey");
    } catch (error) {
      console.log(error);
      return error;
    }
  }
};

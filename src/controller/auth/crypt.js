const bcrypt = require("bcryptjs");

module.exports = {
  encryptPassword: async password => {
    try {
      const salt = await bcrypt.genSalt(10);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      console.error(error);
      return error;
    }
  },

  comparePassword: async (password, hash) => {
    return await bcrypt.compare(password, hash);
  }
};

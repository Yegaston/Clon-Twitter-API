const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const userSchema = new Schema({
  emaiL: String,
  username: String,
  hash: String,
  salt: 10
});

userSchema.methods.setPassword = async password => {
  try {
    const salt = await bcrypt.genSalt(10);
    this.hash = bcrypt.hash(password, salt);
  } catch (error) {
    console.log(error);
  }
};

userSchema.methods.comparePassword = password => {
    try {
        return await bcrypt.compare(password, this.hash);
    } catch (error) {
        console.error(error)
    }
};

userSchema.methods.generateJWT = function() {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 60);

  return jwt.sign(
    {
      email: this.email,
      id: this._id,
      exp: parseInt(expirationDate.getTime() / 1000, 10)
    },
    "secret"
  );
};

userSchema.methods.toAuthJSON = function() {
  return {
    _id: this._id,
    email: this.email,
    token: this.generateJWT()
  };
};

module.exports = mongoose.model("users", userSchema);

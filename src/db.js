const mongoose = require("mongoose");
var emoji = require("node-emoji");
mongoose.set("useCreateIndex", true);
class database {
  constructor() {}

  async startConnection() {
    const dbName = `twitterclon${process.env.NODE_ENV}`;
    try {
      await mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log(`Database - ${dbName} - is running :D`);
    } catch (err) {
      console.error(err);
    }
  }

  async endTest() {
    const dbName = `twitterclon${process.env.NODE_ENV}`;

    try {
      await mongoose.connection.db.dropDatabase();
      console.log(
        "\x1b[33m",
        `${emoji.get("warning")}  -> twitterclon${
          process.env.NODE_ENV
        } has been droped`
      );
      await mongoose.disconnect();
      console.log(
        `${emoji.get("warning")}  ->  Close connection to database - ${dbName}`
      );
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = database;

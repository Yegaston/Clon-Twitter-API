const mongoose = require("mongoose");

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

  async disconnect() {
    const dbName = `twitterclon${process.env.NODE_ENV}`;
    try {
      await mongoose.disconnect();
      console.log(`Close connection to database - ${dbName}`);
    } catch (err) {
      console.error(err);
    }
  }
}

module.exports = database;

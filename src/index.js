const { app, listen } = require("./server");
const db = require("./db");

const database = new db();

require("dotenv").config();

listen();
database.startConnection();

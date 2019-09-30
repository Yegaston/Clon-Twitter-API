const { app, listen } = require("./server");
const db = require("./db");

const database = new db();

listen();
database.startConnection();

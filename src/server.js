const express = require("express");
const app = express();
const morgan = require("morgan");
class server {
  constructor() {
    this.listening();
    this.middlewares();
    this.routes();
  }

  async middlewares() {
    app.use(morgan("dev"));
  }

  routes() {
    app.use('/api', require("./routes/posts"));
  }

  async listening() {
    app.set("port", process.env.PORT || 3000);

    try {
      await app.listen(app.get("port"));
      console.log("Servidor running in port", app.get("port"));
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = server;

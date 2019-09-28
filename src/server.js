const express = require("express");
const app = express();
const morgan = require("morgan");
class server {
  constructor() {
    var sv;
  }

  async middlewares() {
    app.use(morgan("dev"));
  }

  routes() {
    app.use("/api", require("./routes/posts"));
  }

  async listening() {
    this.sv = app.set("port", process.env.PORT || 3000);

    try {
      await app.listen(app.get("port"));
      console.log("Servidor running in port", app.get("port"));
      this.middlewares();
      this.routes();
    } catch (error) {
      console.error(error);
    }
  }

  async close() {
    this.sv.close;
  }
}

module.exports = server;

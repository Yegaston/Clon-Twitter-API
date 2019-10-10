const express = require("express");
const app = express();
const morgan = require("morgan");

let sv;
// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Routes
app.use("/api", require("./routes/posts.routes"));
app.use("/api/comment", require("./routes/comments.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
async function listen() {
  try {
    sv = await app.listen(app.get("port"));
    console.log("Servidor running in port", app.get("port"));
  } catch (error) {
    console.error(error);
  }
}

const close = async () => {
  try {
    await sv.close();
    console.log("Connection close");
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  app: app,
  listen: listen,
  close: close,
  sv: sv
};

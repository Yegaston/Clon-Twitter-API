const express = require("express");
const app = express();
const morgan = require("morgan");
const session = require("express-session");

const passport = require("passport");

let sv;
// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({ secret: "lukenpapito", resave: false, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api", require("./routes/posts"));

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

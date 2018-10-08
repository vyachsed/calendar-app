var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const users = require("./routes/users.js");
const events = require("./routes/events.js");

const mongoose = require("mongoose");
const db = mongoose.connection;
require("dotenv").config();
mongoose.connect("mongodb://localhost/" + process.env.DB_NAME);
var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/users", users);
app.use("/api/events", events);

db.on("error", err => {
  console.log("DB Error ", err);
});

db.once("open", () => {
  app.listen(process.env.PORT, () => {
    console.log("Example app listening on port ", process.env.PORT);
  });
});

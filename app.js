const express = require("express");
const cors = require("cors");
const app = express();

// reg middlewares
app.use(express.json());
app.use(cors());
app.set("view engine", "ejs");
app.use(express.static("public"));

// import all routes
const usersRouter = require("./routes/users");
const notesRouter = require("./routes/notes");
//
// const auth = require("./middlewares/authentication");
//
app.use("/api/users", usersRouter);
app.use("/api/notes", notesRouter);

app.get("*", (req, res, next) => {
  res.send("hello world");
});

// error handlers
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ status: false, msg: err.message });
});

module.exports = app;

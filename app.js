const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

// reg middlewares
app.use(express.json());
app.use(cors());

// import all routes
const usersRouter = require("./routes/users");
const notesRouter = require("./routes/notes");
//
// const auth = require("./middlewares/authentication");
//
app.use("/api/users", usersRouter);
app.use("/api/notes", notesRouter);

// static middleware
// static middleware

// static middleware
app.use(express.static(path.join(__dirname, "public", "dist")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "dist", "index.html"))
);
// error handlers
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ status: false, msg: err.message });
});

module.exports = app;

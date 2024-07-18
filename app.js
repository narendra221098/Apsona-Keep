const express = require("express");
const app = express();

// reg middlewares
app.use(express.json());

// import all routes
const usersRouter = require("./routes/users");
const notesRouter = require("./routes/notes");
//
app.use("/api/users", usersRouter);
app.use("/api/notes", notesRouter);

app.get("/", (req, res, nxt) => {
  res.send("Welcome to Apsona-Keep API");
});

// error handlers
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ status: false, msg: err.message });
});

module.exports = app;

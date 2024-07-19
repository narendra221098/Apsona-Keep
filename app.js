const express = require("express");
const app = express();

// reg middlewares
app.use(express.json());
app.set("view engine", "ejs");
app.use(express.static("public"));

// import all routes
const usersRouter = require("./routes/users");
const notesRouter = require("./routes/notes");
//
const auth = require("./middlewares/authentication");
//
app.use("/api/users", usersRouter);
app.use("/api/notes", notesRouter);

// login
app.get("/", (req, res, nxt) => {
  res.render("home");
});
app.get("/login", (req, res, nxt) => {
  res.render("login");
});
app.get("/register", (req, res, nxt) => {
  res.render("register");
});

// error handlers
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ status: false, msg: err.message });
});

module.exports = app;

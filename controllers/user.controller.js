const UserModel = require("../models/user.model");
const NotesModel = require("../models/notes.model");

const mailHelper = require("../utils/emailHelper");
const mailMessages = require("../data/mail.messages");

// register
exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // checking all the fields
    if (!(name && email && password)) {
      const error = new Error("All fields are required.");
      error.status = 400;
      throw error;
    }

    // checking user with email id
    const findUser = await UserModel.findOne({ email });
    // if user already exists send an error message
    if (findUser) {
      const error = new Error("User already exists with " + email);
      error.status = 401;
      throw error;
    }

    // creating a new user
    const newUser = await UserModel.create({
      name,
      email,
      password,
    });

    // sending mail to client
    const message = mailMessages.signupMessage.replace("{%name%}", name);
    await mailHelper({
      email: newUser.email,
      subject: "Apsona-Keep - Welcome!",
      message: message,
    });

    // remove password before sending
    newUser.password = undefined;

    // sending response to client
    //TODO implement a cookies here
    res.status(201).json({
      status: true,
      msg: "User registered successfully.",
      token: newUser.getJwtToken(),
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

// login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // checking all the fields
    if (!(email && password)) {
      const error = new Error("All fields are required.");
      error.status = 400;
      throw error;
    }

    // checking user with email id
    const findUser = await UserModel.findOne({ email: email }).select(
      "+password"
    );

    // if user is not exists send an error message
    if (!findUser) {
      const error = new Error("User details not found with " + email);
      error.status = 404;
      throw error;
    }

    // checking password
    const isMatch = await findUser.comparedPassword(password);
    // if incorrect password send an error message
    if (!isMatch) {
      const error = new Error("Incorrect password Please try again.");
      error.status = 401;
      throw error;
    }

    // remove password before sending
    findUser.password = undefined;

    // sending response to client
    res.status(200).json({
      status: true,
      msg: "Login successful.",
      token: findUser.getJwtToken(),
      data: findUser,
    });
  } catch (error) {
    next(error);
  }
};

//   my profile
exports.getMyProfile = async (req, res, next) => {
  try {
    res.status(200).json({
      status: true,
      msg: "fetched My Profile successfully",
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
};

// delete my profile
exports.deleteMyProfile = async (req, res, next) => {
  try {
    // dlt user by id
    await UserModel.deleteOne({ _id: req.user._id });
    // dlt notes of user
    await NotesModel.deleteMany({ user: req.user._id });

    // sending mail to user
    const message = mailMessages.deleteMessage.replace(
      "{%name%}",
      req.user.name
    );
    await mailHelper({
      email: req.user.email,
      subject: "Apsona-Keep - Welcome!",
      message: message,
    });

    res.status(200).json({
      status: true,
      msg: "success",
    });
  } catch (error) {
    next(error);
  }
};

const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
module.exports = async function (req, res, next) {
  try {
    let token;
    if (req.headers["authorization"]) {
      token = req.headers["authorization"].split(" ")[1];
    }
    if (!token) {
      const error = new Error("Invalid authorization");
      error.status = 404;
      throw error;
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await UserModel.findById(decode.id);
    if (!user) {
      const error = new Error("Invalid authorization");
      error.status = 404;
      throw error;
    }
    req.user = user;
    next()
  } catch (error) {
    next(error);
  }
};

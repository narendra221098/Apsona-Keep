const routes = require("express").Router();

const userController = require("../controllers/user.controller");

const auth = require("../middlewares/authentication");

routes.route("/register").post(userController.register);
routes.route("/login").post(userController.login);
routes
  .route("/")
  .get(auth, userController.getMyProfile)
  .delete(auth, userController.deleteMyProfile);

module.exports = routes;

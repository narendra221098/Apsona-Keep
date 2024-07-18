const routes = require("express").Router();

const notesController = require("../controllers/notes.controller");

const auth = require("../middlewares/authentication");
const params = require("../middlewares/validParams");

routes
  .route("/")
  .post(auth, notesController.addNotes)
  .get(auth, notesController.getNotes);

routes.route("/delete-notes").get(auth, notesController.getDeletedNotes);

routes
  .route("/:id")
  .get(auth, params, notesController.getNoteById)
  .put(auth, params, notesController.updateById)
  .delete(auth, params, notesController.deleteById);

module.exports = routes;

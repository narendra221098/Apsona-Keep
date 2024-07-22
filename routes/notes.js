const routes = require("express").Router();

const notesController = require("../controllers/notes.controller");

const auth = require("../middlewares/authentication");
const params = require("../middlewares/validParams");

routes
  .route("/")
  .post(auth, notesController.addNotes)
  .get(auth, notesController.getNotes);

routes.route("/archive/:id").put(auth, params, notesController.changeArchive);
routes.route("/restore/:id").put(auth, params, notesController.restore);
routes
  .route("/delete/:id")
  .delete(auth, params, notesController.deletePermanent);
routes.route("/trash").delete(auth, notesController.clearTrash);

routes
  .route("/:id")
  .get(auth, params, notesController.getNoteById)
  .put(auth, params, notesController.updateById)
  .delete(auth, params, notesController.deleteById);

module.exports = routes;

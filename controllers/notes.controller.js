const NotesModel = require("../models/notes.model");

// add
exports.addNotes = async (req, res, next) => {
  try {
    const {
      title = "",
      description = "",
      isPinned = false,
      isArchived = false,
      note_theme = "light",
    } = req.body;

    // // checking all the fields
    // if (!(title && description && isPinned && isArchived && note_theme)) {
    //   const error = new Error("All fields are required.");
    //   error.status = 400;
    //   throw error;
    // }

    // create a new note
    const newNote = await NotesModel.create({
      title,
      description,
      isPinned,
      isArchived,
      note_theme,
      user: req.user._id,
    });

    res.status(201).json({
      status: true,
      msg: "success",
      data: newNote,
    });
  } catch (error) {
    next(error);
  }
};

// get all
exports.getNotes = async (req, res, next) => {
  try {
    const { search_q = "" } = req.query;
    // retrieve all notes based on search query and user
    const notes = await NotesModel.find({
      user: req.user._id,
      "deleted.isDeleted": false,
      isArchived: false,
      $or: [
        { title: { $regex: search_q, $options: "i" } },
        { description: { $regex: search_q, $options: "i" } },
      ],
    });
    // if not found return error
    if (!notes) {
      const error = new Error("No notes found.");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      status: true,
      msg: "success",
      data: notes,
      no_of_notes: notes.length,
    });
  } catch (error) {
    next(error);
  }
};

// get one
exports.getNoteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // retrieve  note based  user id
    const note = await NotesModel.findById(id);
    // if not found return error
    if (!note) {
      const error = new Error("No note found.");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      status: true,
      msg: "success",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};
// Update
exports.updateById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, isPinned, isArchived, note_theme } = req.body;
    // retrieve  note based  user id
    const note = await NotesModel.findById(id);
    // if not found return error
    if (!note) {
      const error = new Error("No note found.");
      error.status = 404;
      throw error;
    }

    // update the note fields
    note.title = title;
    note.description = description;
    note.isPinned = isPinned;
    note.isArchived = isArchived;
    note.note_theme = note_theme;
    note.deleted.isDeleted = false;

    await note.save();

    res.status(200).json({
      status: true,
      msg: "success",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};

// delete
exports.deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const note = await NotesModel.findById(id);
    // if not found return error
    if (!note) {
      const error = new Error("No note found.");
      error.status = 404;
      throw error;
    }
    await NotesModel.updateOne(
      { _id: id },
      {
        deleted: {
          isDeleted: true,
          DeletedDate: Date.now(),
        },
      }
    );

    res.status(200).json({
      status: true,
      msg: "success",
      data: note,
    });
  } catch (error) {
    next(error);
  }
};
// get deleted note from last no of days
exports.getDeletedNotes = async (req, res, next) => {
  try {
    const { days = 30 } = req.query;

    const fewDaysAgo = Date.now() - 1000 * 60 * 60 * 24 * days;

    const notes = await NotesModel.find({
      user: req.user._id,
      "deleted.isDeleted": true,
      "deleted.DeletedDate": { $gt: new Date(fewDaysAgo) },
    });
    res.status(200).json({
      status: true,
      msg: "success",
      data: notes,
      no_of_deleted_notes: notes.length,
    });
  } catch (error) {
    next(error);
  }
};

exports.getArchivedNotes = async (req, res, next) => {
  try {
    const notes = await NotesModel.find({
      user: req.user._id,
      isArchived: true,
      "deleted.isDeleted": false,
    });
    res.status(200).json({
      status: true,
      msg: "success",
      data: notes,
      no_of_archived: notes.length,
    });
  } catch (error) {
    next(error);
  }
};

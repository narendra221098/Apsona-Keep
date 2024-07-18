const mongoose = require("mongoose");

const notesSchema = mongoose.Schema(
  {
    title: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    isPinned: { type: Boolean, default: false },
    isArchived: { type: Boolean, default: false },
    note_theme: { type: String, default: "light" },
    deleted: {
      isDeleted: { type: Boolean, default: false },
      DeletedDate: { type: Date },
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
// labels: [],

module.exports = mongoose.model("Notes", notesSchema);

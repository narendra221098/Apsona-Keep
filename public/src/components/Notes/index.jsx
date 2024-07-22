import { useState } from "react";
import { useOutletContext } from "react-router-dom";
// icons
import { AiOutlineBulb } from "react-icons/ai";
import { BiBellPlus } from "react-icons/bi";
import { RiInboxArchiveLine } from "react-icons/ri";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { MdOutlineColorLens } from "react-icons/md";

//
import eventBubble from "../../utils/eventBubble";
// styles
import styles from "./index.module.css";

// component
import NoteList from "../NoteList";
import Empty from "../Empty";

const emptyNote = {
  title: "",
  description: "",
  reminder: "",
  theme: "",
  isArchived: false,
};

const Notes = () => {
  const [newNote, setNewNote] = useState(emptyNote);
  const { notes, handleAddNewNote } = useOutletContext();

  // on change
  const handleChange = (key, value) => {
    setNewNote({ ...newNote, [key]: value });
  };

  const handleSave = () => {
    if (newNote.title === "" && newNote.description === "") return;
    handleAddNewNote(newNote);
    setNewNote(emptyNote);
  };

  // reset note
  const handleReset = () => {
    setNewNote(emptyNote);
  };

  const filteredNotes = notes.filter((note) => {
    return !note.isArchived && !note.deleted.isDeleted;
  });
  return (
    <div className={styles.container} onClick={handleSave}>
      {/* take a note */}
      <div className={styles.takeNoteContainer} onClick={eventBubble}>
        <input
          className={styles.titleInput}
          value={newNote.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Title"
        />
        <input
          className={styles.descriptionInput}
          value={newNote.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Take a note..."
        />
        <div className={styles.noteIconsContainer}>
          <BiBellPlus className={styles.icon} />
          <MdOutlineColorLens className={styles.icon} />
          <RiInboxArchiveLine className={styles.icon} />
          <HiOutlineDotsVertical className={styles.icon} />
          <span onClick={handleReset}>cancel</span>
        </div>
      </div>
      {/* empty notes */}
      {filteredNotes.length === 0 && (
        <Empty Icon={AiOutlineBulb} text="Notes you add appear here" />
      )}

      <NoteList list={filteredNotes} />

      {/* <ul className={styles.listContainer}>
        {filteredNotes.map((note) => (
          <Note key={note._id} data={note} />
        ))}
      </ul> */}
    </div>
  );
};

export default Notes;

// while take note actions
// display note  note actions

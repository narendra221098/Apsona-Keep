import { useOutletContext } from "react-router-dom";
// icons
import { GoTrash } from "react-icons/go";

// components
import NoteList from "../NoteList";
import Empty from "../Empty";

// styles
import styles from "./index.module.css";

const Trash = () => {
  const { notes, handleClearTrash } = useOutletContext();
  const filteredNotes = notes.filter((note) => note?.deleted?.isDeleted);

  const ids = filteredNotes.map((note) => note._id);

  return (
    <div className={styles.container}>
      <p className={styles.msg}>
        Notes in Trash are deleted after 7 days.
        <span onClick={() => handleClearTrash(ids)}>Empty trash</span>
      </p>
      {/* empty list */}
      {filteredNotes.length === 0 && (
        <div className={styles.emptyContainer}>
          <Empty Icon={GoTrash} text="No notes in Trash" />
        </div>
      )}
      <NoteList list={filteredNotes} />
    </div>
  );
};

export default Trash;

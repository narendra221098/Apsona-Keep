import { useOutletContext } from "react-router-dom";

// icons
import { RiInboxArchiveLine } from "react-icons/ri";

// components
import Empty from "../Empty";
import NoteList from "../NoteList";

// styles
import styles from "./index.module.css";

const Archive = () => {
  const { notes } = useOutletContext();
  const filteredNotes = notes.filter((note) => note.isArchived);
  return (
    <div className={styles.container}>
      {/* empty */}
      {filteredNotes.length === 0 && (
        <Empty
          Icon={RiInboxArchiveLine}
          text="Your archived notes appear here"
        />
      )}
      <NoteList list={filteredNotes} />
    </div>
  );
};

export default Archive;

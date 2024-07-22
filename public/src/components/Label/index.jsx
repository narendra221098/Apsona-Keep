import { GoTrash } from "react-icons/go";
import { useOutletContext } from "react-router-dom";

// components
import Empty from "../Empty";
// styles
import styles from "./index.module.css";

const Label = () => {
  const { notes } = useOutletContext();
  // const filteredNotes = notes.filter((note) => note.deleted.isDelete);
  const filteredNotes = notes;
  return (
    <div className={styles.container}>
      <p>label</p>
    </div>
  );
};

export default Label;

import { useNavigate } from "react-router-dom";
// icons
import { AiOutlineBulb, AiOutlineLogout } from "react-icons/ai";
import { BsBell } from "react-icons/bs";
import { MdLabelOutline } from "react-icons/md";
import { RiInboxArchiveLine } from "react-icons/ri";
import { GoTrash } from "react-icons/go";

import styles from "./index.module.css";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
  };
  return (
    <div className={styles.container}>
      <div
        className={activeTab === "note" ? styles.activeTab : styles.tab}
        onClick={() => handleTabClick("note")}
      >
        <AiOutlineBulb className={styles.icons} />
        <span>Notes</span>
      </div>
      <div
        className={activeTab === "reminder" ? styles.activeTab : styles.tab}
        onClick={() => handleTabClick("reminder")}
      >
        <BsBell className={styles.icons} />
        <span>Reminder</span>
      </div>
      <div
        className={activeTab === "label" ? styles.activeTab : styles.tab}
        onClick={() => handleTabClick("label")}
      >
        <MdLabelOutline className={styles.icons} />
        <span>Edit labels</span>
      </div>
      <div
        className={activeTab === "archive" ? styles.activeTab : styles.tab}
        onClick={() => handleTabClick("archive")}
      >
        <RiInboxArchiveLine className={styles.icons} />
        <span>Archive</span>
      </div>
      <div
        className={activeTab === "trash" ? styles.activeTab : styles.tab}
        onClick={() => handleTabClick("trash")}
      >
        <GoTrash className={styles.icons} />
        <span>Trash</span>
      </div>
      {/*  */}
      <div className={styles.tab} onClick={handleLogout}>
        <AiOutlineLogout className={styles.icons} />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;

import { useOutletContext } from "react-router-dom";

// icons
import { BiBellPlus } from "react-icons/bi";
import { MdOutlineColorLens } from "react-icons/md";
import { RiInboxArchiveLine, RiInboxUnarchiveLine } from "react-icons/ri";
import { HiOutlineTrash } from "react-icons/hi2";
import { LiaTrashRestoreAltSolid } from "react-icons/lia";
import { TbTrashX } from "react-icons/tb";
//
import styles from "./index.module.css";

const NoteList = ({ list }) => {
  const {
    handleArchive,
    handleReminder,
    handleChangeBg,
    handleRestore,
    handleDelete,
    handleDeletePermanent,
  } = useOutletContext();
  const handlePreventSave = (e) => e.stopPropagation();

  return (
    <ul className={styles.listContainer}>
      {list?.map((data) => (
        <li
          key={data._id}
          className={styles.noteContainer}
          onClick={handlePreventSave}
        >
          <p className={styles.title}>{data.title}</p>
          <p className={styles.description}>{data.description}</p>
          <div className={styles.noteIconsContainer}>
            {data?.deleted?.isDeleted ? (
              <>
                <LiaTrashRestoreAltSolid
                  className={styles.icon}
                  onClick={() => handleRestore(data._id)}
                />
                <TbTrashX
                  className={styles.icon}
                  onClick={() => handleDeletePermanent(data._id)}
                />
              </>
            ) : (
              <>
                <BiBellPlus
                  className={styles.icon}
                  onClick={handleReminder(data._id)}
                />
                <MdOutlineColorLens
                  className={styles.icon}
                  onClick={handleChangeBg(data._id)}
                />
                {/* archive and unarchive */}
                {data.isArchived ? (
                  <RiInboxUnarchiveLine
                    className={styles.icon}
                    onClick={() => handleArchive(data._id)}
                  />
                ) : (
                  <RiInboxArchiveLine
                    className={styles.icon}
                    onClick={() => handleArchive(data._id)}
                  />
                )}
                <HiOutlineTrash
                  className={styles.icon}
                  onClick={() => handleDelete(data._id)}
                />
              </>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default NoteList;

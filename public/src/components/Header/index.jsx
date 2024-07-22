//
import { FaRegUserCircle } from "react-icons/fa";
//
import styles from "./index.module.css";

const Header = ({ searchText, handleChangeSearchText }) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <span className={styles.title}>Keep</span>
      </div>
      <div className={styles.searchContainer}>
        <input
          type="search"
          value={searchText}
          onChange={handleChangeSearchText}
          placeholder="Search..."
        />
      </div>
      <div className={styles.imgContainer}>
        <FaRegUserCircle className="react-icons" />
      </div>
    </div>
  );
};

export default Header;

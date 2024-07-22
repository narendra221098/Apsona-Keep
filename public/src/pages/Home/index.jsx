import Notes from "../../components/Notes";
import Reminder from "../../components/Reminder";
import Label from "../../components/Label";
import Archive from "../../components/Archive";
import Trash from "../../components/Trash";

import styles from "./index.module.css";
import { useOutletContext } from "react-router-dom";

const Home = () => {
  const { activeTab } = useOutletContext();
  const tabOptions = {
    note: <Notes />,
    reminder: <Reminder />,
    label: <Label />,
    archive: <Archive />,
    trash: <Trash />,
  };
  const activeTabContent = tabOptions[activeTab];
  return <div className={styles.container}>{activeTabContent}</div>;
};

export default Home;

import React from "react";

import styles from "./index.module.css";

const Empty = ({ Icon, text = "" }) => {
  return (
    <div className={styles.emptyNote}>
      <Icon className={styles.icon} />
      <p>{text}</p>
    </div>
  );
};

export default Empty;

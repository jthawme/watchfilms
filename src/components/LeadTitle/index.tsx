import React from "react";

import styles from "./LeadTitle.module.scss";

const LeadTitle = () => {
  return (
    <div className={styles.page}>
      <div className={styles.grid}>
        <div className={styles.title}>
          <span>Watch</span>
        </div>
        <div className={styles.title}>
          <span>Better</span>
        </div>
        <div className={styles.title}>
          <span>Films</span>
        </div>
      </div>
    </div>
  );
};

export { LeadTitle };

import React, { useEffect } from "react";

import styles from "./LeadTitle.module.scss";
import { useWatchContext } from "components/WatchContext";
import { STAGES } from "common/data";

const LeadTitle = () => {
  const { setStage } = useWatchContext();

  useEffect(() => {
    setTimeout(() => {
      setStage(STAGES.INTRO);
    }, 2000);
  }, [setStage]);

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

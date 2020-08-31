import React from "react";

import styles from "./ActionArea.module.scss";

type ActionItem = {
  label?: string;
  onClick?: () => void;
};

interface ActionAreaProps {
  action: ActionItem;
  subAction?: ActionItem;
}

const ActionArea: React.FC<ActionAreaProps> = ({ action, subAction }) => {
  return (
    <div className={styles.action}>
      <button className={styles.btn} onClick={action.onClick}>
        {action.label || "Click"}
      </button>
      {subAction && (
        <button
          className={`${styles.btn} ${styles.sub}`}
          onClick={subAction.onClick}
        >
          {subAction.label || "Click"}
        </button>
      )}
    </div>
  );
};

export { ActionArea };

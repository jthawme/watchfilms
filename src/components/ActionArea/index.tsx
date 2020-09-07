import React from "react";

import styles from "./ActionArea.module.scss";
import { Tooltip } from "components/common/Tooltip";

type ActionItem = {
  label?: string;
  onClick?: () => void;
  disabled?: boolean;
  tip?: string;
};

interface ActionAreaProps {
  action: ActionItem;
  subAction?: ActionItem;
}

const ActionArea: React.FC<ActionAreaProps> = ({ action, subAction }) => {
  return (
    <div className={styles.action}>
      <button
        className={styles.btn}
        onClick={action.onClick}
        disabled={action.disabled}
      >
        {action.tip ? (
          <Tooltip tip={action.tip} immediate>
            {action.label || "Click"}
          </Tooltip>
        ) : (
          action.label || "Click"
        )}
      </button>
      {subAction && (
        <button
          className={`${styles.btn} ${styles.sub}`}
          onClick={subAction.onClick}
          disabled={subAction.disabled}
        >
          {subAction.tip ? (
            <Tooltip tip={subAction.tip} immediate>
              {subAction.label || "Click"}
            </Tooltip>
          ) : (
            subAction.label || "Click"
          )}
        </button>
      )}
    </div>
  );
};

export { ActionArea };

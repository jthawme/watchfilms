import React, { useMemo } from "react";
import classNames from "classnames";

import styles from "./Rolls.module.scss";

interface RollsProps {
  max?: number;
  current?: number;
}

const Rolls: React.FC<RollsProps> = ({ current = 1, max = 3 }) => {
  const numbers = useMemo(() => {
    return new Array(max).fill(0).map((c, i) => i + 1);
  }, [max]);

  return (
    <ul className={styles.list}>
      {numbers.map((n) => {
        const cls = classNames(styles.item, {
          [styles.past]: current > n,
        });
        return (
          <li key={n} className={cls}>
            <span className={styles.number}>{n}</span>
          </li>
        );
      })}
    </ul>
  );
};

export { Rolls };

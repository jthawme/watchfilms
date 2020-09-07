import React, { useCallback, useState, useRef, useEffect } from "react";
import classNames from "classnames";

import styles from "./Tooltip.module.scss";

interface TooltipProps {
  immediate?: boolean;
  children: React.ReactNode;
  tip: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  tip,
  immediate = true,
}) => {
  const [display, setDisplay] = useState(false);
  const timerRef = useRef<number>(window.setTimeout(() => {}));

  const onMouseEnter = useCallback(() => {
    if (immediate) {
      setDisplay(true);
    } else {
      clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setDisplay(true);
      }, 500);
    }
  }, [immediate]);

  const onMouseLeave = useCallback(() => {
    if (immediate) {
      setDisplay(false);
    } else {
      clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setDisplay(false);
      }, 500);
    }
  }, [immediate]);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  const cls = classNames(styles.wrapper, {
    [styles.display]: display,
  });

  return (
    <span
      className={cls}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <span className={styles.tip}>{tip}</span>

      {children}
    </span>
  );
};

export { Tooltip };

import React, { useRef, useEffect } from "react";
import classNames from "classnames";
import { motion } from "framer-motion";
import { ToastProps } from "./common";
import { fadeInVariants } from "common/transition";
import { ToastContainer, useToastContext } from "./Container";

import styles from "./Toast.module.scss";

interface ToastActualProps extends ToastProps {
  onDone: () => void;
}

const Toast: React.FC<ToastActualProps> = ({
  message,
  type,
  duration = 2500,
  onDone,
  id,
}) => {
  const timerRef = useRef(window.setTimeout(() => {}, 1));
  const cls = classNames(styles.toast, styles[type || ""]);

  useEffect(() => {
    timerRef.current = window.setTimeout(() => {
      onDone();
    }, duration);

    return () => clearTimeout(timerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      key={id}
      initial="initial"
      animate="enter"
      exit="exit"
      variants={{ ...fadeInVariants(0), exit: { opacity: 0, y: -10 } }}
      className={cls}
    >
      {message}
    </motion.div>
  );
};

export { Toast, ToastContainer, useToastContext };

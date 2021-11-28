import React, { useCallback } from "react";
import { motion, Variants } from "framer-motion";
import { useHistory } from "react-router-dom";

import styles from "./LeadTitle.module.scss";
import { defaultTransition } from "common/transition";

const FIRST_KEY = "moviesfirst";

const showWords: Variants = {
  initial: {
    y: "100%",
  },
  enter: (delay = 1) => ({
    y: "0%",
    transition: {
      delay,
      duration: 1,
      ease: [0.215, 0.61, 0.355, 1.0],
    },
  }),
};
const LeadTitle = () => {
  const history = useHistory();

  const onComplete = useCallback(() => {
    const isNotFirst = localStorage.getItem(FIRST_KEY);

    localStorage.setItem(FIRST_KEY, "1");

    setTimeout(() => {
      if (isNotFirst) {
        history.push("/filter");
      } else {
        history.push("/intro");
      }
    }, 1000);
  }, [history]);

  return (
    <motion.div key="intro" {...defaultTransition} className={styles.page}>
      <div className={styles.grid}>
        <div className={styles.title}>
          <motion.span
            variants={showWords}
            initial="initial"
            animate="enter"
            custom={1}
          >
            Watch
          </motion.span>
        </div>
        <div className={styles.title}>
          <motion.span
            variants={showWords}
            initial="initial"
            animate="enter"
            custom={1.1}
          >
            Better
          </motion.span>
        </div>
        <div className={styles.title}>
          <motion.span
            variants={showWords}
            initial="initial"
            animate="enter"
            custom={1.2}
            onAnimationComplete={onComplete}
          >
            Films
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

export { LeadTitle };

import React, { useState, useEffect, useCallback } from "react";

import { motion, AnimatePresence } from "framer-motion";

import styles from "./IntroText.module.scss";
import { defaultTransition } from "common/transition";
import { useHistory } from "react-router-dom";

const STEPS = {
  FIRST: "first",
  SECOND: "second",
};

const IntroText = () => {
  const history = useHistory();
  const [step, setStep] = useState(STEPS.FIRST);

  useEffect(() => {
    setTimeout(() => {
      setStep(STEPS.SECOND);
    }, 2000);
  }, [history]);

  const onComplete = useCallback(() => {
    setTimeout(() => {
      history.push("/filter");
    }, 1000);
  }, [history]);

  return (
    <motion.div key="intro" {...defaultTransition} className={styles.page}>
      <AnimatePresence exitBeforeEnter>
        {step === STEPS.FIRST && (
          <motion.div
            key={STEPS.FIRST}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.content}
          >
            <p>
              Set your preferences,
              <br />
              find your film
            </p>
          </motion.div>
        )}
        {step === STEPS.SECOND && (
          <motion.div
            key={STEPS.SECOND}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.content}
            onAnimationComplete={onComplete}
          >
            <p>3 spins, no redos</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export { IntroText };

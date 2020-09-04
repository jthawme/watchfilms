import React, { useState, useEffect } from "react";

import styles from "./IntroText.module.scss";
import { useWatchContext } from "components/WatchContext";
import { STAGES } from "common/data";

const STEPS = {
  FIRST: "first",
  SECOND: "second",
};

const IntroText = () => {
  const { setStage } = useWatchContext();
  const [step, setStep] = useState(STEPS.FIRST);

  useEffect(() => {
    setTimeout(() => {
      setStep(STEPS.SECOND);
    }, 2000);

    setTimeout(() => {
      setStage(STAGES.FILTER);
    }, 4000);
  }, [setStage]);

  return (
    <div className={styles.page}>
      {step === STEPS.FIRST && (
        <div className={styles.content}>
          <p>
            Set your preferences,
            <br />
            find your film
          </p>
        </div>
      )}
      {step === STEPS.SECOND && (
        <div className={styles.content}>
          <p>3 spins, no redos</p>
        </div>
      )}
    </div>
  );
};

export { IntroText };

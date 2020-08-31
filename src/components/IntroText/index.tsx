import React, { useState } from "react";

import styles from "./IntroText.module.scss";

const STEPS = {
  FIRST: "first",
  SECOND: "second",
};

const IntroText = () => {
  const [step, setStep] = useState(STEPS.FIRST);

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

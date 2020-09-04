import React, { useState, useEffect } from "react";
import classNames from "classnames";

import styles from "./App.module.scss";
import { LeadTitle } from "../components/LeadTitle";
import { IntroText } from "../components/IntroText/";
import { FilterPage } from "../components/FilterPage";
import { FilmLoad } from "../components/FilmLoad";
import { tickedUpdate } from "../common/utils";
import { useWatchContext } from "components/WatchContext";
import { STAGES } from "common/data";

const PADDING_DESIRED = 64;

const App = () => {
  const { stage, resetSeen } = useWatchContext();
  const [showCredits, setShowCredits] = useState(false);
  const [scaleFactor, setScaleFactor] = useState(1);

  useEffect(() => {
    const cb = tickedUpdate(() => {
      setScaleFactor(1 - PADDING_DESIRED / window.innerWidth);
    });

    const onResize = () => {
      cb();
    };

    window.addEventListener("resize", onResize, { passive: true });

    cb();

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    if (showCredits) {
      const cb = (e: any) => {
        if (e.keyCode === 27) {
          setShowCredits(false);
        }
      };

      document.addEventListener("keyup", cb, false);

      return () => {
        document.removeEventListener("keyup", cb);
      };
    }
  }, [showCredits]);

  const cls = classNames(styles.outer, {
    [styles.credits]: showCredits,
  });

  const pageStyle = { "--scale-factor": scaleFactor } as React.CSSProperties;

  return (
    <div className={cls}>
      <main
        className={styles.page}
        style={pageStyle}
        onClick={showCredits ? () => setShowCredits(false) : undefined}
      >
        {stage === STAGES.TITLE && <LeadTitle />}
        {stage === STAGES.INTRO && <IntroText />}
        {stage === STAGES.FILTER && <FilterPage />}
        {stage === STAGES.FILM && <FilmLoad />}
      </main>

      {stage !== STAGES.TITLE && stage !== STAGES.INTRO && (
        <button
          className={styles.creditsBtn}
          onClick={() => setShowCredits(!showCredits)}
        >
          {showCredits ? "Close" : "Credits"}
        </button>
      )}

      <footer className={styles.footer}>
        <div className={styles.left}>
          <p>
            An opinionated list of directors to be the jumping off point for
            your tireless searching
          </p>
        </div>
        <div className={styles.right}>
          <p>
            Made by{" "}
            <a
              href="https://jthaw.me"
              target="_blank"
              rel="noreferrer noopener"
            >
              jthaw
            </a>
          </p>
          <p>Did this instead of finding a film to watch</p>
          <p>
            <button onClick={() => resetSeen()}>Reset 'seen' films</button>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;

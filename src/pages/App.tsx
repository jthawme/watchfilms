import React, { useState, useEffect, useCallback } from "react";
import classNames from "classnames";
import { AnimatePresence } from "framer-motion";
import ReactGA from "react-ga";

import styles from "./App.module.scss";
import { LeadTitle } from "../components/LeadTitle";
import { IntroText } from "../components/IntroText/";
import { FilterPage } from "../components/FilterPage";
import { FilmLoad } from "../components/FilmLoad";
import { tickedUpdate } from "../common/utils";
import { useWatchContext } from "components/WatchContext";
import { Switch, Route, useLocation } from "react-router-dom";
import { useToastContext } from "components/common/Toast";
import { Tooltip } from "components/common/Tooltip";
import { Helmet } from "react-helmet";

const PADDING_DESIRED = 64;

const App = () => {
  const { addToast } = useToastContext();
  const location = useLocation();
  const { resetSeen } = useWatchContext();
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
    const cb = () => {
      addToast({
        message: "New version of the site. Please refresh",
        duration: 10000,
      });
    };

    window.addEventListener("sw-updated", cb, false);

    return () => {
      window.removeEventListener("sw-updated", cb);
    };
  }, [addToast]);

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

  useEffect(() => {
    ReactGA.pageview(location.pathname);
  }, [location]);

  const onReset = useCallback(() => {
    resetSeen();
    setShowCredits(false);
  }, [resetSeen]);

  const cls = classNames(styles.outer, {
    [styles.credits]: showCredits,
  });

  const pageStyle = { "--scale-factor": scaleFactor } as React.CSSProperties;

  return (
    <div className={cls}>
      <Helmet
        defaultTitle="Watch Better Films"
        titleTemplate="%s – Watch Better Films"
      />
      <main
        className={styles.page}
        style={pageStyle}
        onClick={showCredits ? () => setShowCredits(false) : undefined}
      >
        <AnimatePresence exitBeforeEnter>
          <Switch location={location} key={location.pathname}>
            <Route path="/intro">
              <IntroText />
            </Route>
            <Route path="/filter">
              <FilterPage />
            </Route>
            <Route path="/film">
              <FilmLoad />
            </Route>
            <Route exact path="/">
              <LeadTitle />
            </Route>
          </Switch>
        </AnimatePresence>
      </main>

      {location.pathname !== "/" && location.pathname !== "/intro" && (
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
            <button onClick={onReset}>
              <Tooltip tip="Films will appear again">
                Reset 'seen' films
              </Tooltip>
            </button>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;

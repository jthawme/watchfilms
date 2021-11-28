import React, { useState, useMemo } from "react";

import styles from "./FilmSelection.module.scss";
import { ActionArea } from "../ActionArea";
import { movieDbImage } from "../../common/utils";
import { getDirectorById, Film } from "common/data";
import { LazyImage } from "components/common/LazyImage";
import { motion, AnimatePresence } from "framer-motion";
import { defaultTransition, fadeInTransition } from "common/transition";
import { Helmet } from "react-helmet";

export interface FilmSelectionProps extends Film {
  onRespin: () => void;
  onSkip: () => void;
  canRespin: boolean;
}

const FilmSelection: React.FC<FilmSelectionProps> = ({
  title,
  director,
  runtime,
  genres,
  date,
  synopsis,
  poster,
  onRespin,
  onSkip,
  canRespin,
  imdb,
  score,
  rottenTomatoes,
}) => {
  const genre = useMemo(() => {
    return genres.filter((g) => g).shift();
  }, [genres]);
  const displayDate = useMemo(() => {
    return new Date(date).getFullYear();
  }, [date]);
  const [showSynopsis, setShowSynopsis] = useState(false);

  return (
    <>
      <Helmet title={title} />
      <motion.section {...defaultTransition} className={styles.layout}>
        <AnimatePresence>
          {showSynopsis && (
            <motion.div {...defaultTransition} className={styles.synopsis}>
              <div className={styles.content}>
                <p>{synopsis}</p>

                <button
                  onClick={() => setShowSynopsis(false)}
                  className={styles.close}
                >
                  Close
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <header className={styles.header}>
          <a
            target="_blank"
            rel="noreferrer noopener"
            href={`https://www.imdb.com/title/${imdb}`}
          >
            <h2>Watch</h2>
          </a>
        </header>
        <div className={styles.left}>
          <h1>{title}</h1>
          <p>
            <span className={styles.director}>
              {getDirectorById(director)?.label || "Unknown"}
            </span>
            <br />
            {runtime} mins
            <br />
            {genre}
            <br />
            {displayDate}
            <br />
          </p>
          <p>
            <button onClick={() => setShowSynopsis(true)}>Synopsis</button>
          </p>
          <p>
            <span className={styles.scores}>
              <span data-title="Score">{score}</span>
              {rottenTomatoes >= 0 && (
                <span className={styles.rs} data-title="Rotten Tomatoes">
                  {rottenTomatoes}%
                </span>
              )}
            </span>
          </p>
        </div>
        <div className={styles.right}>
          <LazyImage
            alt=""
            src={movieDbImage(poster)}
            className={styles.image}
          />
        </div>
        <motion.footer {...fadeInTransition(1)} className={styles.footer}>
          <ActionArea
            action={{
              label: "Find another film →",
              onClick: onRespin,
              disabled: !canRespin,
            }}
            subAction={{
              label: "I've seen this film already",
              onClick: onSkip,
              tip: "This film won't appear again",
            }}
          />
        </motion.footer>
      </motion.section>
    </>
  );
};

export { FilmSelection };

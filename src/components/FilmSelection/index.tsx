import React, { useState, useMemo } from "react";

import styles from "./FilmSelection.module.scss";
import { ActionArea } from "../ActionArea";
import { movieDbImage } from "../../common/utils";
import { getDirectorById, Film } from "common/data";
import { LazyImage } from "components/common/LazyImage";

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
}) => {
  const displayDate = useMemo(() => {
    return new Date(date).getFullYear();
  }, [date]);
  const [showSynopsis, setShowSynopsis] = useState(false);

  return (
    <section className={styles.layout}>
      {showSynopsis && (
        <div className={styles.synopsis}>
          <div className={styles.content}>
            <p>{synopsis}</p>

            <button
              onClick={() => setShowSynopsis(false)}
              className={styles.close}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <header className={styles.header}>
        <h2>Watch</h2>
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
          {genres.shift()}
          <br />
          {displayDate}
          <br />
        </p>
        <p>
          <button onClick={() => setShowSynopsis(true)}>Synopsis</button>
        </p>
      </div>
      <div className={styles.right}>
        <LazyImage alt="" src={movieDbImage(poster)} className={styles.image} />
      </div>
      <footer className={styles.footer}>
        <ActionArea
          action={{
            label: "Find another film →",
            onClick: onRespin,
            disabled: !canRespin,
          }}
          subAction={{
            label: "I've seen this film already",
            onClick: onSkip,
          }}
        />
      </footer>
    </section>
  );
};

export { FilmSelection };

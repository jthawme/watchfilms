import React, { useState } from "react";

import styles from "./FilmSelection.module.scss";
import { ActionArea } from "../ActionArea";
import { movieDbImage } from "../../common/utils";

const TEST_SYNOPSIS = `When a beautiful first-grade teacher arrives at a prep school, she soon attracts the attention of an ambitious teenager named Max, who quickly falls in love with her. Max turns to the father of two of his schoolmates for advice on how to woo the teacher. However, the situation soon gets complicated when Max's new friend becomes involved with her, setting the two pals against one another in a war for her attention.`;

const FilmSelection = ({
  title = "The Last Black Man in San Francisco",
  director = "Joe Talbot",
  time = "117 mins",
  genre = "Drama",
  year = "2019",
  synopsis = TEST_SYNOPSIS,
}) => {
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
          <span className={styles.director}>{director}</span>
          <br />
          {time}
          <br />
          {genre}
          <br />
          {year}
          <br />
        </p>
        <p>
          <button onClick={() => setShowSynopsis(true)}>Synopsis</button>
        </p>
      </div>
      <div className={styles.right}>
        <img alt="" src={movieDbImage("/hSJ6swahAuZ8wM96lHDTwQPXUvZ.jpg")} />
      </div>
      <footer className={styles.footer}>
        <ActionArea
          action={{
            label: "Find another film →",
            onClick: () => console.log("click action"),
          }}
          subAction={{
            label: "I've seen this film already",
            onClick: () => console.log("click seen"),
          }}
        />
      </footer>
    </section>
  );
};

export { FilmSelection };

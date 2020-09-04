import React, { useState, useEffect, useCallback } from "react";

import { Rolls } from "../Rolls";
import { FilmSelection } from "../FilmSelection";
import styles from "./FilmLoad.module.scss";
import { DIRECTORS, Film } from "common/data";
import { useWatchContext } from "components/WatchContext";

const endpoint = "/.netlify/functions";

const timer = (delay = 1000) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};

const FilmSafe: React.FC<{
  film?: Film;
  onRespin: () => void;
  onSkip: () => void;
  canRespin: boolean;
}> = ({ film, onRespin, onSkip, canRespin }) => {
  if (!film) {
    return null;
  }

  return (
    <FilmSelection
      {...film}
      onRespin={onRespin}
      onSkip={onSkip}
      canRespin={canRespin}
    />
  );
};

const directorKeys = Object.keys(DIRECTORS);

const FilmLoad = () => {
  const { directors, addSkip, skip } = useWatchContext();

  const [loading, setLoading] = useState<boolean>(true);
  const [filmCount, setFilmCount] = useState<number>(1);
  const [film, setFilm] = useState<Film>();

  const search = useCallback(() => {
    setLoading(true);

    const directorString =
      !directors || directors.length === 0
        ? directorKeys[Math.floor(directorKeys.length * Math.random())]
        : directors.join(",");

    Promise.all([
      timer(2000),
      fetch(`${endpoint}/film`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          directors: directorString,
          skip: skip.map((s) => s.id).join(","),
        }),
      })
        .then((resp) => {
          if (resp.status === 200) {
            return resp.json();
          }

          return resp.json().then((data) => {
            throw new Error(data.message);
          });
        })
        .then((film) => {
          setFilm(film);
        })
        .catch((e) => {
          console.log(e);
        }),
    ]).then(() => {
      setLoading(false);
    });
  }, [directors, skip]);

  useEffect(() => {
    search();
  }, [search]);

  const onRespin = useCallback(() => {
    if (film) {
      addSkip(film.id, false);
    }
    setFilmCount(filmCount + 1);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        search();
      });
    });
  }, [addSkip, film, filmCount, search]);

  const onSkip = useCallback(() => {
    if (film) {
      addSkip(film.id, true);
    }

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        search();
      });
    });
  }, [addSkip, film, search]);

  return (
    <div className={styles.outer}>
      {loading || !film ? (
        <div className={styles.page}>
          <Rolls current={filmCount} />
        </div>
      ) : (
        <FilmSafe
          film={film}
          onRespin={onRespin}
          onSkip={onSkip}
          canRespin={filmCount < 3}
        />
      )}
    </div>
  );
};

export { FilmLoad };

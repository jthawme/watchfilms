import React, { useState, useEffect, useCallback } from "react";

import { Rolls } from "../Rolls";
import { FilmSelection } from "../FilmSelection";
import styles from "./FilmLoad.module.scss";
import { DIRECTORS, Film, FILTER, QueryFilter, GENRES } from "common/data";
import { useWatchContext } from "components/WatchContext";
import { motion, AnimatePresence } from "framer-motion";
import { defaultTransition } from "common/transition";
import { useToastContext } from "components/common/Toast";
import { ToastType } from "components/common/Toast/common";

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
      key="film"
      {...film}
      onRespin={onRespin}
      onSkip={onSkip}
      canRespin={canRespin}
    />
  );
};

const FilmLoad = () => {
  const { addToast } = useToastContext();
  const { directors, genres, addSkip, getSkip, filterType } = useWatchContext();

  const [loading, setLoading] = useState<boolean>(true);
  const [filmCount, setFilmCount] = useState<number>(1);
  const [film, setFilm] = useState<Film>();

  const search = useCallback(() => {
    setLoading(true);

    const data: QueryFilter = {
      skip: getSkip()
        .map((s) => s.id)
        .join(","),
    };

    let route = "/film";

    if (filterType === FILTER.DIRECTOR) {
      const directorString =
        !directors || directors.length === 0
          ? DIRECTORS[Math.floor(DIRECTORS.length * Math.random())].value
          : directors.join(",");

      data.directors = directorString;
    }

    if (filterType === FILTER.GENRE) {
      const genreString =
        !genres || genres.length === 0
          ? GENRES[Math.floor(GENRES.length * Math.random())].value
          : genres.join(",");

      data.genres = genreString;
      route = "/genre";
    }

    Promise.all([
      timer(2000),
      fetch(`${endpoint}${route}`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
          addToast({ message: "Unable to find film", type: ToastType.ERROR });
        }),
    ]).then(() => {
      setLoading(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterType, directors, genres]);

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
      addToast({
        message: "This film won't appear again",
        type: ToastType.SUCCESS,
      });
    }

    search();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addSkip, film, search]);

  return (
    <motion.div {...defaultTransition} className={styles.outer}>
      <AnimatePresence exitBeforeEnter>
        {loading || !film ? (
          <motion.div
            key="rolls"
            {...defaultTransition}
            className={styles.page}
          >
            <Rolls current={filmCount} />
          </motion.div>
        ) : (
          <FilmSafe
            film={film}
            onRespin={onRespin}
            onSkip={onSkip}
            canRespin={filmCount < 3}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export { FilmLoad };

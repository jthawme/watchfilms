import React, { useState } from "react";

import { Rolls } from "../Rolls";
import { FilmSelection } from "../FilmSelection";
import styles from "./FilmLoad.module.scss";

const FilmLoad = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [filmCount, setFilmCount] = useState<number>(3);
  return (
    <div className={styles.outer}>
      {loading ? (
        <div className={styles.page}>
          <Rolls current={filmCount} />
        </div>
      ) : (
        <FilmSelection />
      )}
    </div>
  );
};

export { FilmLoad };

import React, { useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { FilterSection } from "./FilterSection";

import { DIRECTORS, GENRES, FILTER } from "../../common/data";
import { ActionArea } from "../ActionArea";
import { useWatchContext } from "components/WatchContext";
import { motion } from "framer-motion";
import { defaultTransition } from "common/transition";
import styles from "./FilterPage.module.scss";

const FilterPage = () => {
  const history = useHistory();
  const {
    filterType,
    setFilterType,
    setDirectors,
    setGenres,
  } = useWatchContext();

  const [filters, setFilters] = useState<{
    directors: string[];
    genres: string[];
  }>({
    directors: [],
    genres: [],
  });

  const updateFilter = useCallback(
    (key: string, selected: string[]) => {
      setFilters({
        ...filters,
        [key]: selected,
      });
    },
    [filters]
  );

  const onNext = useCallback(() => {
    setDirectors(filters.directors);
    setGenres(filters.genres);
    history.push("/film");
  }, [setDirectors, filters.directors, filters.genres, setGenres, history]);

  const switchFilter = useCallback(() => {
    (window as any).plausible("Filter switched");
    setFilterType(filterType === FILTER.GENRE ? FILTER.DIRECTOR : FILTER.GENRE);
  }, [filterType, setFilterType]);

  return (
    <motion.div key="filter" {...defaultTransition} className={styles.page}>
      <div className={styles.content}>
        {filterType === FILTER.GENRE && (
          <FilterSection
            title="Genre"
            items={GENRES}
            selected={filters.genres}
            onSelect={(selected: string[]) => updateFilter("genres", selected)}
          />
        )}

        {filterType === FILTER.DIRECTOR && (
          <FilterSection
            title="Director"
            items={DIRECTORS}
            selected={filters.directors}
            onSelect={(selected: string[]) =>
              updateFilter("directors", selected)
            }
            upsell
          />
        )}
      </div>

      <div className={styles.footer}>
        <ActionArea
          action={{
            label: "Find my film →",
            onClick: () => onNext(),
          }}
          subAction={{
            label:
              filterType === FILTER.GENRE
                ? "Choose Director instead"
                : "Choose Genre instead",
            onClick: () => switchFilter(),
          }}
        />
      </div>
    </motion.div>
  );
};

export { FilterPage };

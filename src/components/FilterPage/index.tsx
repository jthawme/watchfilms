import React, { useState, useCallback } from "react";

import styles from "./FilterPage.module.scss";
import { FilterSection } from "./FilterSection";

import { DIRECTORS, STAGES } from "../../common/data";
import { ActionArea } from "../ActionArea";
import { useWatchContext } from "components/WatchContext";

const FilterPage = () => {
  const { setDirectors, setStage } = useWatchContext();

  const [filters, setFilters] = useState<{ directors: string[] }>({
    directors: [],
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
    setStage(STAGES.FILM);
  }, [filters.directors, setDirectors, setStage]);

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <FilterSection
          title="Director"
          items={DIRECTORS}
          selected={filters.directors}
          onSelect={(selected: string[]) => updateFilter("directors", selected)}
        />
      </div>

      <div className={styles.footer}>
        <ActionArea
          action={{
            label: "Find my film →",
            onClick: () => onNext(),
          }}
          subAction={{
            label: "Choose genre instead",
            onClick: () => console.log("click genre"),
          }}
        />
      </div>
    </div>
  );
};

export { FilterPage };

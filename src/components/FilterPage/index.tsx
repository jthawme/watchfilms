import React, { useState, useCallback } from "react";

import styles from "./FilterPage.module.scss";
import { FilterSection } from "./FilterSection";

import { DIRECTORS } from "../../common/data";
import { ActionArea } from "../ActionArea";

const FilterPage = () => {
  const [filters, setFilters] = useState({
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
            onClick: () => console.log("click action"),
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

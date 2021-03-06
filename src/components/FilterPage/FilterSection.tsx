import React, { useMemo, useCallback, useState, useRef } from "react";
import Fuse from "fuse.js";

import styles from "./FilterPage.module.scss";

type FilterItem = {
  label: string;
  value: string;
};

interface FilterSectionProps {
  title: string;
  items: Array<FilterItem>;
  selected: string[];
  onSelect: (selected: string[]) => void;
  upsell?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  items,
  selected,
  onSelect,
  upsell,
}) => {
  const fuse = useRef(
    new Fuse(items, {
      keys: ["label", "value"],
      threshold: 0.4,
    })
  );
  const timer = useRef(setTimeout(() => {}, 1));

  const [filterText, setFilterText] = useState("");
  const [triggerFilterText, setTriggerFilterText] = useState("");

  const filteredItems = useMemo(() => {
    if (!triggerFilterText) {
      return items;
    }

    return fuse.current.search(triggerFilterText).map(({ item }) => item);
  }, [triggerFilterText, items]);

  const checkedItems = useMemo(() => {
    return filteredItems.map((i) => ({
      ...i,
      selected: selected.includes(i.value),
    }));
  }, [filteredItems, selected]);

  const reportSelected = useCallback(
    (val) => {
      const sel = selected.slice();
      const idx = sel.indexOf(val);

      if (idx >= 0) {
        sel.splice(idx, 1);
      } else {
        sel.push(val);
      }

      onSelect(sel);
    },
    [onSelect, selected]
  );

  const triggerFilter = useCallback((e) => {
    const value = e.target.value;
    setFilterText(value);

    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setTriggerFilterText(value);
    }, 500);
  }, []);

  return (
    <section className={styles.section}>
      <header className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.middle}>
          {selected.length > 0 && (
            <span className={styles.selectedTitle}>
              {selected.length} selected
            </span>
          )}
        </div>
        <div className={styles.filter}>
          <input
            onChange={triggerFilter}
            type="text"
            placeholder="Search"
            value={filterText}
            className={!!filterText ? styles.hasText : ""}
          />
        </div>
      </header>

      <div className={styles.pool}>
        <div className={styles.poolItems}>
          {checkedItems.map((item) => (
            <label key={item.value} className={styles.item}>
              <input
                onChange={(e) => reportSelected(item.value)}
                type="checkbox"
                name={item.value}
                checked={item.selected}
              />
              <span>{item.label}</span>
            </label>
          ))}
          {upsell && (
            <a
              href={`https://twitter.com/intent/tweet?text=@jthawme You neeeeed to add this director to your site: `}
              target="_blank"
              rel="noreferrer noopener"
              className={`${styles.item} ${styles.alt}`}
            >
              <span>Missing someone?</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export { FilterSection };

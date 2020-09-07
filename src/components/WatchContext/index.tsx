import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { FILTER } from "common/data";
import { useLocation, Redirect } from "react-router-dom";
import { useToastContext } from "components/common/Toast";

type SkipId = {
  id: string;
  persist: boolean;
};

interface WatchContextProps {
  directors: string[];
  setDirectors: (directors: string[]) => void;
  genres: string[];
  setGenres: (genres: string[]) => void;
  getSkip: () => SkipId[];
  addSkip: (id: string, persist?: boolean) => void;
  resetSeen: () => void;
  filterType: FILTER;
  setFilterType: (filterType: FILTER) => void;
}

interface WatchContextContainerProps {
  children: React.ReactNode;
}

const WatchContext = createContext<WatchContextProps>({
  directors: [],
  setDirectors: () => {},
  genres: [],
  setGenres: () => {},
  getSkip: () => [],
  addSkip: () => {},
  resetSeen: () => {},
  filterType: FILTER.GENRE,
  setFilterType: () => {},
});

const PERSIST_KEY = "skipmovies";

const WatchContextContainer: React.FC<WatchContextContainerProps> = ({
  children,
}) => {
  const { addToast } = useToastContext();
  const location = useLocation();
  const [filterType, setFilterType] = useState<FILTER>(FILTER.GENRE);
  const [directors, setDirectors] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const skip = useRef<SkipId[]>([]);
  const [landed, setLanded] = useState<boolean>(false);

  const addSkip = useCallback(
    (id: string, persist = false) => {
      if (!skip.current.find((s) => s.id === id)) {
        const skips = [
          ...skip.current,
          {
            id,
            persist,
          },
        ];

        skip.current = skips;

        localStorage.setItem(PERSIST_KEY, skips.map((s) => s.id).join(","));
      }
    },
    [skip]
  );

  const resetSeen = useCallback(() => {
    localStorage.setItem(PERSIST_KEY, "");
    addToast({ message: "Films reset" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const skips = localStorage.getItem(PERSIST_KEY);

    if (skips) {
      skip.current = skips.split(",").map((s) => ({
        id: s,
        persist: true,
      }));
    }

    setLanded(true);
  }, []);

  const value = {
    directors,
    setDirectors,
    genres,
    setGenres,
    getSkip: () => skip.current,
    addSkip,
    resetSeen,
    filterType,
    setFilterType,
  };

  if (
    (location.pathname === "/intro" && !landed) ||
    (location.pathname === "/film" && !landed)
  ) {
    return <Redirect to="/" />;
  }

  return (
    <WatchContext.Provider value={value}>{children}</WatchContext.Provider>
  );
};

const useWatchContext = () => useContext(WatchContext);

export { WatchContextContainer, useWatchContext };

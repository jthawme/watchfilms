import React, {
  createContext,
  useState,
  useContext,
  useCallback,
  useEffect,
} from "react";
import { STAGES } from "common/data";

type SkipId = {
  id: string;
  persist: boolean;
};

interface WatchContextProps {
  directors: string[];
  setDirectors: (directors: string[]) => void;
  stage: STAGES;
  setStage: (stage: STAGES) => void;
  skip: SkipId[];
  addSkip: (id: string, persist?: boolean) => void;
  resetSeen: () => void;
}

interface WatchContextContainerProps {
  children: React.ReactNode;
}

const WatchContext = createContext<WatchContextProps>({
  directors: [],
  setDirectors: () => {},
  stage: STAGES.TITLE,
  setStage: () => {},
  skip: [],
  addSkip: () => {},
  resetSeen: () => {},
});

const PERSIST_KEY = "skipmovies";

const WatchContextContainer: React.FC<WatchContextContainerProps> = ({
  children,
}) => {
  const [directors, setDirectors] = useState<string[]>([]);
  const [stage, setStage] = useState(STAGES.TITLE);
  const [skip, setSkip] = useState<WatchContextProps["skip"]>([]);

  const addSkip = useCallback(
    (id: string, persist = false) => {
      if (!skip.find((s) => s.id === id)) {
        const skips = [
          ...skip,
          {
            id,
            persist,
          },
        ];

        setSkip(skips);

        localStorage.setItem(PERSIST_KEY, skips.map((s) => s.id).join(","));
      }
    },
    [skip]
  );

  const resetSeen = useCallback(() => {
    localStorage.setItem(PERSIST_KEY, "");
  }, []);

  useEffect(() => {
    const skips = localStorage.getItem(PERSIST_KEY);

    if (skips) {
      setSkip(
        skips.split(",").map((s) => ({
          id: s,
          persist: true,
        }))
      );
    }
  }, []);

  const value = {
    directors,
    setDirectors,
    stage,
    setStage,
    skip,
    addSkip,
    resetSeen,
  };

  return (
    <WatchContext.Provider value={value}>{children}</WatchContext.Provider>
  );
};

const useWatchContext = () => useContext(WatchContext);

export { WatchContextContainer, useWatchContext };

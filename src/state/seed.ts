import ls from "localstorage-slim";
import { nanoid } from "nanoid";

import { createContext, useCallback, useContext, useState } from "react";
import { KEY_SESSION } from "@neverquest/data/general";

export const SeedContext = createContext(() => console.error("SeedContext.Provider not found"));

export const useRestart = () => {
  const context = useContext(SeedContext);

  return () => {
    ls.remove(KEY_SESSION);
    context();
  };
};

export const useSeed = () => {
  const [seed, setSeed] = useState(nanoid());

  const resetSeed = useCallback(() => {
    setSeed(nanoid());
  }, []);

  return { resetSeed, seed };
};

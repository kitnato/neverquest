import { nanoid } from "nanoid";
import { createContext, useCallback, useState } from "react";

export const SeedContext = createContext(() => console.warn("SeedContext.Provider not found"));

export const useSeed = () => {
  const [seed, setSeed] = useState(nanoid());

  const resetSeed = useCallback(() => {
    setSeed(nanoid());
  }, []);

  return { seed, resetSeed };
};

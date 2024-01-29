import { createContext } from "react";

export const SeedContext = createContext(() => {
  console.error("SeedContext.Provider not found");
});

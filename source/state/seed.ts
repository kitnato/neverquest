import { createContext } from "preact"

export const SeedContext = createContext(() => {
	console.error("SeedContext.Provider not found")
})

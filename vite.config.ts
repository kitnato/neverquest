import path from "node:path"
import { fileURLToPath } from "node:url"

import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { checker } from "vite-plugin-checker"
import { VitePWA } from "vite-plugin-pwa"
import svgr from "vite-plugin-svgr"
import tsconfigPaths from "vite-tsconfig-paths"

const currentPath = path.dirname(fileURLToPath(import.meta.url))

// eslint-disable-next-line import/no-default-export
export default defineConfig({
	assetsInclude: ["**/*.md"],
	base: "/neverquest",
	plugins: [
		checker({
			eslint: { lintCommand: "eslint --ext .ts,.tsx ." },
			overlay: false,
			typescript: true,
		}),
		react(),
		svgr(),
		tsconfigPaths(),
		VitePWA({
			includeAssets: ["apple-touch-icon.png", "android-chrome-512x512.png", "mstile-310x310.png"],
			registerType: "autoUpdate",
		}),
	],
	resolve: {
		alias: {
			"~animate.css": path.resolve(currentPath, "node_modules/animate.css"),
			"~bootstrap": path.resolve(currentPath, "node_modules/bootstrap"),
			"~react-circular-progressbar": path.resolve(
				currentPath,
				"node_modules/react-circular-progressbar",
			),
		},
	},
})

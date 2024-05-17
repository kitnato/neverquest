import ls from "localstorage-slim"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import { Core } from "@neverquest/components/Core"
import { LEVELLING_MAXIMUM } from "@neverquest/data/general"

import "@neverquest/styles/index.scss"

ls.config.secret = LEVELLING_MAXIMUM

const root = document.querySelector("#root")

if (root === null) {
	throw new Error("Cannot select document root.")
}
else {
	createRoot(root).render(
		<StrictMode>
			<Core />
		</StrictMode>,
	)
}

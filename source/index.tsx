import ls from "localstorage-slim"
import { render } from "preact"

import { Core } from "@neverquest/components/Core"
import { LEVELLING_MAXIMUM } from "@neverquest/data/general"

import "@neverquest/styles/index.scss"

ls.config.secret = LEVELLING_MAXIMUM

const root = document.querySelector("#root")

if (root === null) {
	throw new Error("Cannot select document root.")
}
else {
	render(<Core />, root)
}

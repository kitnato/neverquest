import { useRef, useState } from "react"

import { useAnimation } from "@neverquest/hooks/useAnimation"

const CURSOR = "|"
const CURSOR_DELAY = 500
const SEPARATOR = "."
const TEXT_DELAY = 100

export function Typewriter({ children, delay = TEXT_DELAY }: { children: string, delay?: number }) {
	const deltaCursorReference = useRef(0)
	const deltaDelayReference = useRef(0)
	const [cursor, setCursor] = useState(CURSOR)
	const [index, setIndex] = useState(0)
	const [text, setText] = useState("")

	useAnimation({
		onFrame: (elapsed) => {
			deltaCursorReference.current += elapsed
			deltaDelayReference.current += elapsed

			if (index === children.length && deltaCursorReference.current >= CURSOR_DELAY) {
				setCursor(currentCursor => (currentCursor === CURSOR ? "" : CURSOR))
				deltaCursorReference.current = 0
			}

			if (
				index < children.length
				&& deltaDelayReference.current >= (children[index - 1] === SEPARATOR ? delay * 3 : delay)
			) {
				setText(currentText => currentText + children[index])
				setIndex(currentIndex => currentIndex + 1)

				deltaDelayReference.current = 0
			}
		},
	})

	return (
		<strong className="monospaced">
			{text}
			{cursor === "" ? <>&nbsp;</> : cursor}
		</strong>
	)
}

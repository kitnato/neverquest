import { useRef, useState } from "preact/hooks"

import { useAnimation } from "@neverquest/hooks/useAnimation"

const CURSOR = "|"
const CURSOR_DELAY = 500
const SEPARATOR = "."
const TEXT_DELAY = 100

export function Typewriter({
	delay = TEXT_DELAY,
	onEnd,
	text,
}: {
	delay?: number
	onEnd?: () => void
	text: string
}) {
	const deltaCursorReference = useRef(0)
	const deltaDelayReference = useRef(0)

	const [cursor, setCursor] = useState(CURSOR)
	const [index, setIndex] = useState(0)
	const [typedText, setTypedText] = useState("")

	useAnimation({
		onFrame: (elapsed) => {
			deltaCursorReference.current += elapsed
			deltaDelayReference.current += elapsed

			if (index === text.length && deltaCursorReference.current >= CURSOR_DELAY) {
				setCursor(currentCursor => currentCursor === CURSOR ? "" : CURSOR)
				deltaCursorReference.current = 0

				if (onEnd !== undefined) {
					onEnd()
				}
			}

			if (
				index < text.length
				&& deltaDelayReference.current >= (text[index - 1] === SEPARATOR ? delay * 3 : delay)
			) {
				setTypedText(currentText => currentText + text[index])
				setIndex(currentIndex => currentIndex + 1)

				deltaDelayReference.current = 0
			}
		},
	})

	return (
		<strong className="monospaced">
			{typedText}
			{cursor === "" ? <>&nbsp;</> : cursor}
		</strong>
	)
}

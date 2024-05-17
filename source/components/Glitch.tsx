import { nanoid } from "nanoid"
import { type ReactNode, useCallback, useLayoutEffect, useMemo, useRef, useState } from "react"
import { useRecoilValue } from "recoil"

import { LEVELLING_END } from "@neverquest/data/general"
import { FINALITY_STAGE } from "@neverquest/data/monster"
import { useAnimation } from "@neverquest/hooks/useAnimation"
import { stage } from "@neverquest/state/encounter"
import { getFromRange, getLinearMapping, getRange } from "@neverquest/utilities/getters"

const CHARACTERS = "!·&=?¿|@#~¬+/\\^*[]{}-_<>"

const GLITCHING_CLASS = "glitching"
const GLITCH_NUMBERS = [5, 7]
const GLITCH_STAGE_MINIMUM = FINALITY_STAGE["res dominus"] - 5

const LATENCY = 70

function getGlitchingElement(glitchClassName: string) {
	const textElements = document.body
		.querySelector(`.${glitchClassName}`)
		?.querySelectorAll(`h6:not(.${GLITCHING_CLASS}), span:not(.${GLITCHING_CLASS}), strong:not(.${GLITCHING_CLASS})`)

	if (textElements === undefined) {
		return
	}

	return [...textElements][Math.floor(Math.random() * textElements.length)]
}

function glitchElementAt({ element, originalText }: { element: Element, originalText: string }) {
	const { textContent } = element

	if (textContent !== null) {
		element.textContent = [...textContent]
			.map((_, index) => {
				const glitchChance = Math.random()

				if (glitchChance <= 0.2) {
					return CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)]
				}

				if (glitchChance <= 0.6) {
					return GLITCH_NUMBERS[Math.floor(Math.random() * GLITCH_NUMBERS.length)]
				}

				return originalText[index]
			})
			.join("")
	}
}

export function Glitch({ children, isContinuous = false }: { children: ReactNode, isContinuous?: boolean }) {
	const stageValue = useRecoilValue(stage)

	const [glitchingElements, setGlitchingElements] = useState<
		Record<
			string,
			{
				duration: number
				element: Element
				latency: number
				originalText: string
				position: number
			}
		>
	>({})
	const [intervalElapsed, setIntervalElapsed] = useState(0)

	const factor = useMemo(
		() =>
			getLinearMapping({ offset: GLITCH_STAGE_MINIMUM, stage: stageValue }) / LEVELLING_END,
		[stageValue],
	)
	const interval = useMemo(
		() =>
			isContinuous
				? 1000
				: Math.round(
					getFromRange(
						getRange({
							factor,
							ranges: [
								{ maximum: 55_000, minimum: 50_000 },
								{ maximum: 15_000, minimum: 12_000 },
							],
						}),
					),
				),
		[factor, isContinuous],
	)

	const { current: glitchClassName } = useRef(`glitched-${nanoid()}`)

	const startGlitching = useCallback(() => {
		const glitchingElement = getGlitchingElement(glitchClassName)

		if (glitchingElement !== undefined) {
			const { classList, textContent } = glitchingElement

			if (textContent !== null) {
				classList.add(GLITCHING_CLASS, "monospaced")

				setGlitchingElements(elements => ({
					...elements,
					[nanoid()]: {
						duration: isContinuous
							? 990
							: Math.round(
								getFromRange(
									getRange({
										factor,
										ranges: [
											{ maximum: 600, minimum: 400 },
											{ maximum: 3200, minimum: 2800 },
										],
									}),
								),
							),
						element: glitchingElement,
						latency: LATENCY,
						originalText: textContent,
						position: Math.floor(Math.random() * textContent.length),
					},
				}))
			}
		}
	}, [factor, glitchClassName, isContinuous])

	useAnimation({
		onFrame: (elapsed) => {
			if (intervalElapsed >= interval) {
				startGlitching()

				setIntervalElapsed(0)
			}
			else {
				setIntervalElapsed(intervalElapsed + elapsed)
			}

			for (const [ID, { duration, element, latency, originalText, position }] of Object.entries(
				glitchingElements,
			)) {
				if (duration <= 0) {
					element.classList.remove(GLITCHING_CLASS, "monospaced")
					element.textContent = originalText

					setGlitchingElements(({ [ID]: _, ...elements }) => ({ ...elements }))
				}
				else {
					if (latency <= 0) {
						glitchElementAt({ element, originalText })
					}

					setGlitchingElements(elements => ({
						...elements,
						[ID]: {
							duration: duration - elapsed,
							element,
							latency: latency <= 0 ? LATENCY : latency - elapsed,
							originalText,
							position,
						},
					}))
				}
			}
		},
		stop: !isContinuous && stageValue < GLITCH_STAGE_MINIMUM,
	})

	useLayoutEffect(() => {
		if (isContinuous) {
			startGlitching()
		}
	}, [isContinuous, startGlitching])

	return (
		<div className={glitchClassName}>
			{children}
		</div>
	)
}

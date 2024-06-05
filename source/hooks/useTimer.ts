import { useEffect, useRef, useState } from "preact/hooks"
import { clearInterval, setInterval } from "worker-timers"

import { FRAMERATE } from "@neverquest/data/general"

import type { SetterOrUpdater } from "recoil"

export function useTimer({
	factor = 1,
	maximumDuration,
	onElapsed,
	setDuration,
	stop,
}: {
	factor?: number
	maximumDuration?: number
	onElapsed?: () => void
	setDuration: SetterOrUpdater<number>
	stop: boolean
}) {
	const interval = useRef(-1)
	const previousTime = useRef(0)

	const [hasTicked, setHasTicked] = useState(false)

	const terminate = () => {
		if (interval.current !== -1) {
			clearInterval(interval.current)

			interval.current = -1
			previousTime.current = 0
		}
	}

	useEffect(() => {
		if (hasTicked) {
			if (onElapsed !== undefined) {
				onElapsed()
			}

			setHasTicked(false)
		}
	}, [hasTicked, onElapsed])

	useEffect(() => {
		if (stop) {
			terminate()
		}
		else if (interval.current === -1) {
			interval.current = setInterval(() => {
				const now = Date.now()

				setDuration((elapsed) => {
					const newDelta = elapsed - (now - (previousTime.current || now)) * factor

					if (newDelta <= 0) {
						// Cannot invoke setDuration() here due to rules of hooks (state updates at top level only).
						setHasTicked(true)

						return 0
					}

					if (maximumDuration !== undefined && newDelta >= maximumDuration) {
						setHasTicked(true)

						return maximumDuration
					}

					return newDelta
				})

				previousTime.current = now
			}, FRAMERATE)
		}

		return terminate
	}, [factor, maximumDuration, setDuration, stop])
}

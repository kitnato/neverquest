import { useRecoilValue } from "recoil"

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar"
import { LABEL_EMPTY, PERCENTAGE_POINTS } from "@neverquest/data/general"
import { distance, isMonsterAiling } from "@neverquest/state/monster"
import { range } from "@neverquest/state/statistics"
import { formatNumber } from "@neverquest/utilities/formatters"

export function DistanceMeter() {
	const isMonsterFrozen = useRecoilValue(isMonsterAiling("frozen"))
	const distanceValue = useRecoilValue(distance)
	const rangeValue = useRecoilValue(range)

	return (
		<LabelledProgressBar
			disableTransitions
			isAnimated={isMonsterFrozen}
			value={(distanceValue / rangeValue) * PERCENTAGE_POINTS}
			variant="secondary"
		>
			<span>
				{distanceValue === 0 ? LABEL_EMPTY : formatNumber({ format: "time", value: distanceValue })}
			</span>
		</LabelledProgressBar>
	)
}

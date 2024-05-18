import { useRecoilValue } from "recoil"

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar"
import { LABEL_EMPTY, PERCENTAGE } from "@neverquest/data/general"
import { distance } from "@neverquest/state/monster"
import { range } from "@neverquest/state/statistics"
import { formatNumber } from "@neverquest/utilities/formatters"

export function DistanceMeter() {
	const distanceValue = useRecoilValue(distance)
	const rangeValue = useRecoilValue(range)

	return (
		<LabelledProgressBar
			disableTransitions
			value={(distanceValue / rangeValue) * PERCENTAGE}
			variant="secondary"
		>
			<span>
				{distanceValue === 0 ? LABEL_EMPTY : formatNumber({ format: "time", value: distanceValue })}
			</span>
		</LabelledProgressBar>
	)
}

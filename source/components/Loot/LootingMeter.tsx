import { useRecoilValue } from "recoil"

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar"
import { PERCENTAGE } from "@neverquest/data/general"
import { LOOTING_RATE } from "@neverquest/data/statistics"
import { lootingDuration } from "@neverquest/state/character"
import { formatNumber } from "@neverquest/utilities/formatters"

export function LootingMeter() {
	const lootingDurationValue = useRecoilValue(lootingDuration)

	const { base } = LOOTING_RATE

	return (
		<LabelledProgressBar
			disableTransitions
			value={((base - lootingDurationValue) / base) * PERCENTAGE}
			variant="secondary"
		>
			<span>{formatNumber({ format: "time", value: lootingDurationValue })}</span>
		</LabelledProgressBar>
	)
}

import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar"
import { PERCENTAGE_POINTS } from "@neverquest/data/general"
import {
	isMonsterAiling,
	monsterAttackDuration,
	monsterAttackRate,
} from "@neverquest/state/monster"
import { formatNumber } from "@neverquest/utilities/formatters"

export function MonsterAttackRateMeter() {
	const isMonsterFrozen = useRecoilValue(isMonsterAiling("frozen"))
	const monsterAttackDurationValue = useRecoilValue(monsterAttackDuration)
	const monsterAttackRateValue = useRecoilValue(monsterAttackRate)

	return (
		<LabelledProgressBar
			disableTransitions
			isAnimated={isMonsterFrozen}
			value={(
				(monsterAttackDurationValue === 0
					? 0
					: monsterAttackRateValue - monsterAttackDurationValue
				)
				/ monsterAttackRateValue
			) * PERCENTAGE_POINTS}
			variant="secondary"
		>
			<Stack direction="horizontal" gap={1}>
				<span>
					{formatNumber({
						format: "time",
						value: monsterAttackDurationValue || monsterAttackRateValue,
					})}
				</span>

				<DeltasDisplay delta="monsterAttackRate" />
			</Stack>
		</LabelledProgressBar>
	)
}

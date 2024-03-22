import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar"
import { PERCENTAGE_POINTS } from "@neverquest/data/general"
import { monsterHealth, monsterHealthMaximum } from "@neverquest/state/monster"
import { formatNumber } from "@neverquest/utilities/formatters"

export function MonsterHealthMeter() {
	const monsterHealthValue = useRecoilValue(monsterHealth)
	const monsterHealthMaximumValue = useRecoilValue(monsterHealthMaximum)

	return (
		<LabelledProgressBar
			attachment="below"
			value={(monsterHealthValue / monsterHealthMaximumValue) * PERCENTAGE_POINTS}
		>
			<Stack direction="horizontal" gap={1}>
				<span>
					{formatNumber({ value: monsterHealthValue })}
&nbsp;/&nbsp;
					{formatNumber({
						value: monsterHealthMaximumValue,
					})}
				</span>

				<Stack>
					<DeltasDisplay delta="monsterHealth" />

					<DeltasDisplay delta="monsterHealthMaximum" />
				</Stack>
			</Stack>
		</LabelledProgressBar>
	)
}

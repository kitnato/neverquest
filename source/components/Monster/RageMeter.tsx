import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar"
import { PERCENTAGE } from "@neverquest/data/general"
import { RAGE } from "@neverquest/data/monster"
import { isEnraged, rage } from "@neverquest/state/monster"
import { formatNumber } from "@neverquest/utilities/formatters"

export function RageMeter() {
	const isEnragedValue = useRecoilValue(isEnraged)
	const rageValue = useRecoilValue(rage)

	const { maximum } = RAGE

	return (
		<LabelledProgressBar
			isAnimated={isEnragedValue}
			value={(rageValue / maximum) * PERCENTAGE}
			variant="secondary"
		>
			<Stack direction="horizontal" gap={1}>
				<span>
					{formatNumber({
						value: rageValue,
					})}
					{" / "}
					{formatNumber({
						value: maximum,
					})}
				</span>

				<DeltasDisplay delta="rage" />
			</Stack>
		</LabelledProgressBar>
	)
}

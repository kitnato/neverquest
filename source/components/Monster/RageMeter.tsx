import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { Glitch } from "@neverquest/components/Glitch"
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar"
import { PERCENTAGE } from "@neverquest/data/general"
import { RAGE } from "@neverquest/data/monster"
import { isRelicEquipped } from "@neverquest/state/items"
import { isEnraged, rage } from "@neverquest/state/monster"
import { formatNumber } from "@neverquest/utilities/formatters"

export function RageMeter() {
	const isEnragedValue = useRecoilValue(isEnraged)
	const isRelicEquippedWarMask = useRecoilValue(isRelicEquipped("war mask"))
	const rageValue = useRecoilValue(rage)

	const { maximum } = RAGE

	return (
		<LabelledProgressBar
			isAnimated={isEnragedValue}
			value={((isEnragedValue ? maximum : rageValue) / maximum) * PERCENTAGE}
			variant="secondary"
		>
			{isRelicEquippedWarMask
				? (
					<Glitch isContinuous>
						<span>YOU SHALL NOT</span>
					</Glitch>
				)
				: (
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
				)}
		</LabelledProgressBar>
	)
}

import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { IconImage } from "@neverquest/components/IconImage"
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar"
import { PERCENTAGE } from "@neverquest/data/general"
import { RAGE } from "@neverquest/data/monster"
import IconWarMask from "@neverquest/icons/war-mask.svg?react"
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
				? <IconImage className="small stencilled" Icon={IconWarMask} />
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

import { useRecoilValue } from "recoil"

import { BadgeMaximum } from "@neverquest/components/BadgeMaximum"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar"
import { PERCENTAGE } from "@neverquest/data/general"
import IconEssence from "@neverquest/icons/essence.svg?react"
import { infusion, infusionMaximum, isInfusionAtMaximum } from "@neverquest/state/items"
import { formatNumber } from "@neverquest/utilities/formatters"

import type { Infusable } from "@neverquest/types/unions"

export function InfusionProgress({ infusable }: { infusable: Infusable }) {
	const infusionValue = Math.round(useRecoilValue(infusion(infusable)))
	const isInfusionAtMaximumValue = useRecoilValue(isInfusionAtMaximum(infusable))
	const infusionMaximumValue = useRecoilValue(infusionMaximum(infusable))

	return (
		<LabelledProgressBar
			disableTransitions
			value={
				isInfusionAtMaximumValue
					? PERCENTAGE
					: (infusionValue / infusionMaximumValue) * PERCENTAGE
			}
			variant="secondary"
		>
			<IconDisplay Icon={IconEssence} iconProps={{ className: "small stencilled" }}>
				{isInfusionAtMaximumValue
					? <BadgeMaximum />
					: (
						<span>
							{`${formatNumber({ value: infusionValue })} / ${formatNumber({ value: infusionMaximumValue })}`}
						</span>
					)}
			</IconDisplay>
		</LabelledProgressBar>
	)
}

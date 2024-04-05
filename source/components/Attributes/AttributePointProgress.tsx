import { OverlayTrigger, Popover, PopoverBody } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { IconImage } from "@neverquest/components/IconImage"
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar"
import { PERCENTAGE } from "@neverquest/data/general"
import IconEssence from "@neverquest/icons/essence.svg?react"
import IconLoot from "@neverquest/icons/loot.svg?react"
import { powerLevel } from "@neverquest/state/attributes"
import { essence, essenceLoot } from "@neverquest/state/resources"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getAttributePointCost, getAttributePoints } from "@neverquest/utilities/getters"

export function AttributePointProgress({ isLoot }: { isLoot?: boolean }) {
	const essenceValue = useRecoilValue(essence)
	const essenceLootValue = useRecoilValue(essenceLoot)
	const powerLevelValue = useRecoilValue(powerLevel)

	const totalEssence = essenceValue + (isLoot ? essenceLootValue : 0)
	const nextTotalCost = Array.from<undefined>({
		length: getAttributePoints({
			essence: totalEssence,
			powerLevel: powerLevelValue,
		}),
	}).reduce(
		(sum, _, index) => sum + getAttributePointCost(powerLevelValue + index + 1),
		getAttributePointCost(powerLevelValue),
	)

	return (
		<OverlayTrigger
			overlay={(
				<Popover>
					<PopoverBody>
						{isLoot
							? (
								<>
									<span>Essence after </span>

									<IconImage className="small" Icon={IconLoot} />

									<span> loot collection</span>
								</>
							)
							: (
								<>
									<span>Current </span>

									<IconImage className="small" Icon={IconEssence} />

									<span> essence</span>
								</>
							)}

						<span> and required essence for next attribute point.</span>
					</PopoverBody>
				</Popover>
			)}
		>
			<div className="w-100">
				<LabelledProgressBar
					value={(totalEssence / nextTotalCost) * PERCENTAGE}
					variant="secondary"
				>
					<IconDisplay Icon={IconEssence} iconProps={{ className: "small stencilled" }}>
						<span className="text-nowrap">
							{formatNumber({ value: totalEssence })}
							{" / "}
							{formatNumber({
								value: nextTotalCost,
							})}
						</span>
					</IconDisplay>
				</LabelledProgressBar>
			</div>
		</OverlayTrigger>
	)
}

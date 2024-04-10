import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap"
import { useRecoilState, useRecoilValue } from "recoil"

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar"
import {
	CLASS_FULL_WIDTH_JUSTIFIED,
	LABEL_MAXIMUM,
	LABEL_NO_ESSENCE,
	PERCENTAGE,
	POPOVER_TRIGGER,
} from "@neverquest/data/general"
import { MUNITIONS } from "@neverquest/data/items"
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconEssence from "@neverquest/icons/essence.svg?react"
import IconMunitionsSatchel from "@neverquest/icons/munitions-satchel.svg?react"
import IconMunitions from "@neverquest/icons/munitions.svg?react"
import { ownedItem } from "@neverquest/state/inventory"
import { munitions } from "@neverquest/state/items"
import { essence } from "@neverquest/state/resources"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getFromRange, getSigmoid } from "@neverquest/utilities/getters"

export function CraftMunitions() {
	const [munitionsValue, setMunitions] = useRecoilState(munitions)
	const essenceValue = useRecoilValue(essence)
	const ownedItemMunitionsSatchel = useRecoilValue(ownedItem("munitions satchel"))

	const transactEssence = useTransactEssence()

	const { amount, maximum, priceRange } = MUNITIONS
	const price = Math.round(
		getFromRange({
			factor: getSigmoid(munitionsValue),
			...priceRange,
		}),
	)
	const isAffordable = price <= essenceValue
	const isAtMaximum = munitionsValue >= maximum
	const canCraft = isAffordable && !isAtMaximum

	useDeltaText({
		delta: "munitions",
		state: munitions,
	})

	if (ownedItemMunitionsSatchel === undefined) {
		return <span>&quot;How will you store munitions?&quot;</span>
	}

	return (
		<Stack gap={3}>
			<IconDisplay Icon={IconMunitionsSatchel} tooltip="Munitions satchel">
				<LabelledProgressBar value={(munitionsValue / maximum) * PERCENTAGE}>
					<Stack direction="horizontal" gap={1}>
						<span>
							{formatNumber({ value: munitionsValue })}
							{" / "}
							{formatNumber({
								value: maximum,
							})}
						</span>

						<DeltasDisplay delta="munitions" />
					</Stack>
				</LabelledProgressBar>
			</IconDisplay>

			<div className={CLASS_FULL_WIDTH_JUSTIFIED}>
				<IconDisplay description={`Increases munitions by ${amount}.`} Icon={IconMunitions} tooltip="Munitions">
					<span>New armaments</span>
				</IconDisplay>

				<Stack className="ms-2" direction="horizontal" gap={3}>
					<IconDisplay Icon={IconEssence} tooltip="Price">
						<span>{isAtMaximum ? LABEL_MAXIMUM : formatNumber({ value: price })}</span>
					</IconDisplay>

					<OverlayTrigger
						overlay={(
							<Tooltip>
								<Stack>
									{!isAffordable && <span>{LABEL_NO_ESSENCE}</span>}

									{isAtMaximum && <span>At full capacity.</span>}
								</Stack>
							</Tooltip>
						)}
						trigger={canCraft ? [] : POPOVER_TRIGGER}
					>
						<div>
							<Button
								disabled={!canCraft}
								onClick={() => {
									if (canCraft) {
										transactEssence(-price)

										setMunitions(currentMunitions => currentMunitions + amount)
									}
								}}
								variant="outline-dark"
							>
								<span>Craft</span>
							</Button>
						</div>
					</OverlayTrigger>
				</Stack>
			</div>
		</Stack>
	)
}
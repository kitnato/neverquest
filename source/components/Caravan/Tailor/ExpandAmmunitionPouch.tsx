import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap"
import { useRecoilState, useRecoilValue } from "recoil"

import { AmmunitionPouchCapacity } from "@neverquest/components/Caravan/Tailor/AmmunitionPouchCapacity"
import { DescriptionDisplay } from "@neverquest/components/DescriptionDisplay"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { TAILORING } from "@neverquest/data/caravan"
import {
	CLASS_FULL_WIDTH_JUSTIFIED,
	LABEL_NO_ESSENCE,
	POPOVER_TRIGGER,
} from "@neverquest/data/general"
import { AMMUNITION_CAPACITY } from "@neverquest/data/items"
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence"
import IconAmmunition from "@neverquest/icons/ammunition.svg?react"
import IconEssence from "@neverquest/icons/essence.svg?react"
import IconTailoring from "@neverquest/icons/tailoring.svg?react"
import { ammunitionCapacity } from "@neverquest/state/items"
import { essence } from "@neverquest/state/resources"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getFromRange, getSigmoid } from "@neverquest/utilities/getters"

export function ExpandAmmunitionPouch() {
	const [ammunitionCapacityValue, setAmmunitionCapacity] = useRecoilState(ammunitionCapacity)
	const essenceValue = useRecoilValue(essence)

	const transactEssence = useTransactEssence()

	const { amount, priceRange } = TAILORING["ammunition pouch"]
	const price = Math.max(
		Math.round(
			getFromRange({
				factor: getSigmoid((ammunitionCapacityValue - (AMMUNITION_CAPACITY - amount)) / amount),
				...priceRange,
			}),
		),
		priceRange.minimum,
	)
	const isAffordable = price <= essenceValue

	return (
		<Stack gap={3}>
			<h6>Ammunition pouch</h6>

			<AmmunitionPouchCapacity />

			<div className={CLASS_FULL_WIDTH_JUSTIFIED}>
				<IconDisplay
					description={(
						<DescriptionDisplay
							description={`Increases maximum # ammunition by ${amount}.`}
							descriptionIcons={[IconAmmunition]}
						/>
					)}
					Icon={IconTailoring}
					tooltip="Tailoring"
				>
					<span>Add quiver</span>
				</IconDisplay>

				<Stack className="ms-2" direction="horizontal" gap={3}>
					<IconDisplay Icon={IconEssence} tooltip="Price">
						<span>{formatNumber({ value: price })}</span>
					</IconDisplay>

					<OverlayTrigger
						overlay={(
							<Tooltip>
								<span>{LABEL_NO_ESSENCE}</span>
							</Tooltip>
						)}
						trigger={isAffordable ? [] : POPOVER_TRIGGER}
					>
						<div>
							<Button
								disabled={!isAffordable}
								onClick={() => {
									transactEssence(-price)
									setAmmunitionCapacity(
										currentAmmunitionCapacity => currentAmmunitionCapacity + amount,
									)
								}}
								variant="outline-dark"
							>
								<span>Expand</span>
							</Button>
						</div>
					</OverlayTrigger>
				</Stack>
			</div>
		</Stack>
	)
}

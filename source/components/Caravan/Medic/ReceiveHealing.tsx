import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DescriptionDisplay } from "@neverquest/components/DescriptionDisplay"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { SURGERY_PRICE } from "@neverquest/data/caravan"
import {
	CLASS_FULL_WIDTH_JUSTIFIED,
	LABEL_FULL_HEALTH,
	LABEL_NO_ESSENCE,
	POPOVER_TRIGGER,
} from "@neverquest/data/general"
import { useHealing } from "@neverquest/hooks/actions/useHealing"
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence"
import IconEssence from "@neverquest/icons/essence.svg?react"
import IconHealing from "@neverquest/icons/healing.svg?react"
import IconHealth from "@neverquest/icons/health.svg?react"
import IconStamina from "@neverquest/icons/stamina.svg?react"
import { powerLevel } from "@neverquest/state/attributes"
import { isHealthAtMaximum } from "@neverquest/state/reserves"
import { essence } from "@neverquest/state/resources"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getFromRange, getSigmoid } from "@neverquest/utilities/getters"

export function ReceiveHealing() {
	const essenceValue = useRecoilValue(essence)
	const isHealthAtMaximumValue = useRecoilValue(isHealthAtMaximum)
	const powerLevelValue = useRecoilValue(powerLevel)

	const transactEssence = useTransactEssence()

	const price = Math.round(
		getFromRange({
			factor: getSigmoid(powerLevelValue),
			...SURGERY_PRICE,
		}),
	)
	const isAffordable = price <= essenceValue
	const isPurchasable = isAffordable && !isHealthAtMaximumValue

	const healing = useHealing()

	return (
		<Stack gap={3}>
			<h6>Receive healing</h6>

			<div className={CLASS_FULL_WIDTH_JUSTIFIED}>
				<IconDisplay
					description={(
						<DescriptionDisplay
							description="If injured, fully restores # health and # stamina."
							descriptionIcons={[IconHealth, IconStamina]}
						/>
					)}
					Icon={IconHealing}
					tooltip="Healing"
				>
					<span>Surgery</span>
				</IconDisplay>

				<Stack className="ms-2" direction="horizontal" gap={3}>
					<IconDisplay Icon={IconEssence} tooltip="Price">
						<span>{formatNumber({ value: price })}</span>
					</IconDisplay>

					<OverlayTrigger
						overlay={(
							<Tooltip>
								<Stack>
									{!isAffordable && <span>{LABEL_NO_ESSENCE}</span>}

									{isHealthAtMaximumValue && <span>{LABEL_FULL_HEALTH}</span>}
								</Stack>
							</Tooltip>
						)}
						trigger={isPurchasable ? [] : POPOVER_TRIGGER}
					>
						<div>
							<Button
								disabled={!isPurchasable}
								onClick={() => {
									healing("health")
									healing("stamina")

									transactEssence(-price)
								}}
								variant="outline-dark"
							>
								<span>Operate</span>
							</Button>
						</div>
					</OverlayTrigger>
				</Stack>
			</div>
		</Stack>
	)
}

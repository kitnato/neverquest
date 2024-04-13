import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconImage } from "@neverquest/components/IconImage"
import { LABEL_UNKNOWN } from "@neverquest/data/general"
import { useToggleLocation } from "@neverquest/hooks/actions/useToggleLocation"
import IconFinalTravel from "@neverquest/icons/final-travel.svg?react"
import IconTravel from "@neverquest/icons/travel.svg?react"
import { isAttacking, isIncapacitated } from "@neverquest/state/character"
import {
	canAwaken,
	isStageCompleted,
	location,
	progress,
	progressMaximum,
} from "@neverquest/state/encounter"
import { encumbranceExtent } from "@neverquest/state/inventory"
import { essenceLoot, itemsLoot } from "@neverquest/state/resources"
import { isShowing } from "@neverquest/state/ui"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function Travel() {
	const canAwakenValue = useRecoilValue(canAwaken)
	const encumbranceExtentValue = useRecoilValue(encumbranceExtent)
	const essenceLootValue = useRecoilValue(essenceLoot)
	const isAttackingValue = useRecoilValue(isAttacking)
	const isIncapacitatedValue = useRecoilValue(isIncapacitated)
	const isShowingLocation = useRecoilValue(isShowing("location"))
	const isStageCompletedValue = useRecoilValue(isStageCompleted)
	const itemsLootValue = useRecoilValue(itemsLoot)
	const locationValue = useRecoilValue(location)
	const progressValue = useRecoilValue(progress)
	const progressMaximumValue = useRecoilValue(progressMaximum)

	const toggleLocation = useToggleLocation()

	const isCaravan = locationValue === "caravan"
	// Occurs if the knapsack is sold and carrying more than the weight difference of its absence.
	const isOverEncumbered = isCaravan && encumbranceExtentValue === "over-encumbered"

	if (
		(
			(progressMaximumValue === Number.POSITIVE_INFINITY ? progressValue > 0 : isStageCompletedValue)
			&& essenceLootValue === 0
		)
		|| isCaravan
		|| canAwakenValue
	) {
		return (
			<OverlayTrigger
				overlay={(
					<Tooltip>
						<span>
							{isOverEncumbered
								? "Over-encumbered."
								: (!isCaravan
									? `Go to ${canAwakenValue || !isShowingLocation
										? LABEL_UNKNOWN
										: "caravan"
									}`
									: "Return to wilderness")}
						</span>
					</Tooltip>
				)}
			>
				<div className={getAnimationClass({ animation: "bounceIn" })}>
					<Button
						className={
							!isAttackingValue && !isCaravan && itemsLootValue.length === 0
								? getAnimationClass({ animation: "pulse", isInfinite: true })
								: undefined
						}
						disabled={isAttackingValue || isIncapacitatedValue || isOverEncumbered}
						onClick={() => { toggleLocation() }}
						variant="outline-dark"
					>
						<IconImage
							Icon={canAwakenValue ? IconFinalTravel : IconTravel}
							isMirrored={isCaravan}
						/>
					</Button>
				</div>
			</OverlayTrigger>
		)
	}
}

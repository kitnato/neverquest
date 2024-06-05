import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconImage } from "@neverquest/components/IconImage"
import { useCollectLoot } from "@neverquest/hooks/actions/useCollectLoot"
import IconLoot from "@neverquest/icons/loot.svg?react"
import { isAttacking, isLooting, isStageCompleted, location, progressMaximum } from "@neverquest/state/character"
import { isIncapacitated } from "@neverquest/state/reserves"
import { isLootAvailable } from "@neverquest/state/resources"
import { getAnimationClass } from "@neverquest/utilities/getters"

export function CollectLoot() {
	const isAttackingValue = useRecoilValue(isAttacking)
	const isIncapacitatedValue = useRecoilValue(isIncapacitated)
	const isLootAvailableValue = useRecoilValue(isLootAvailable)
	const isLootingValue = useRecoilValue(isLooting)
	const isStageCompletedValue = useRecoilValue(isStageCompleted)
	const locationValue = useRecoilValue(location)
	const progressMaximumValue = useRecoilValue(progressMaximum)

	const collectLoot = useCollectLoot()

	if (
		isLootAvailableValue
		&& (progressMaximumValue === Number.POSITIVE_INFINITY || isStageCompletedValue)
		&& locationValue === "wilderness"
	) {
		return (
			<OverlayTrigger
				overlay={(
					<Tooltip>
						<span>Collect loot</span>
					</Tooltip>
				)}
			>
				<div className={getAnimationClass({ animation: "bounceIn" })}>
					<Button
						className={
							isStageCompletedValue
								? getAnimationClass({ animation: "pulse", isInfinite: true })
								: undefined
						}
						disabled={isIncapacitatedValue || isAttackingValue || isLootingValue}
						onClick={collectLoot}
						variant="outline-dark"
					>
						<IconImage Icon={IconLoot} />
					</Button>
				</div>
			</OverlayTrigger>
		)
	}

	return null
}

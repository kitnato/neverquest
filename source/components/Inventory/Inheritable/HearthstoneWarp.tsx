import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useRecoilValue, useResetRecoilState } from "recoil"

import { POPOVER_TRIGGER } from "@neverquest/data/general"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { useToggleLocation } from "@neverquest/hooks/actions/useToggleLocation"
import { isAttacking } from "@neverquest/state/character"
import { location } from "@neverquest/state/encounter"
import { activeControl } from "@neverquest/state/ui"

export function HearthstoneWarp() {
	const isAttackingValue = useRecoilValue(isAttacking)
	const locationValue = useRecoilValue(location)
	const resetActiveControl = useResetRecoilState(activeControl)

	const progressQuest = useProgressQuest()
	const toggleLocation = useToggleLocation()

	const canWarp = !isAttackingValue && locationValue === "wilderness"

	return (
		<OverlayTrigger
			overlay={(
				<Tooltip>
					<span>The hearthstone is cold.</span>
				</Tooltip>
			)}
			trigger={canWarp ? [] : POPOVER_TRIGGER}
		>
			<div>
				<Button
					disabled={!canWarp}
					onClick={() => {
						progressQuest({ quest: "warpingCaravan" })
						resetActiveControl()
						toggleLocation()
					}}
					variant="outline-dark"
				>
					<span>Warp</span>
				</Button>
			</div>
		</OverlayTrigger>
	)
}

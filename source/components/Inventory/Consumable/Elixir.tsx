import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useRecoilValue, useSetRecoilState } from "recoil"

import { POPOVER_TRIGGER } from "@neverquest/data/general"
import { useHealing } from "@neverquest/hooks/actions/useHealing"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { inventory } from "@neverquest/state/inventory"
import { isStaminaAtMaximum } from "@neverquest/state/reserves"

export function Elixir({ ID }: { ID: string }) {
	const isStaminaAtMaximumValue = useRecoilValue(isStaminaAtMaximum)
	const setInventory = useSetRecoilState(inventory)

	const healing = useHealing()
	const progressQuest = useProgressQuest()

	return (
		<OverlayTrigger
			overlay={(
				<Tooltip>
					<span>Already at full stamina.</span>
				</Tooltip>
			)}
			trigger={isStaminaAtMaximumValue ? POPOVER_TRIGGER : []}
		>
			<div>
				<Button
					disabled={isStaminaAtMaximumValue}
					onClick={() => {
						healing("stamina")

						setInventory(currentInventory =>
							currentInventory.filter(({ ID: currentItemID }) => currentItemID !== ID),
						)

						progressQuest({ quest: "potions" })
					}}
					variant="outline-dark"
				>
					<span>Drink</span>
				</Button>
			</div>
		</OverlayTrigger>
	)
}

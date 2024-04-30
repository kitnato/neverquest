import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { POPOVER_TRIGGER } from "@neverquest/data/general"
import { useMending } from "@neverquest/hooks/actions/useMending"
import { isStaminaAtMaximum } from "@neverquest/state/reserves"

export function Elixir({ ID }: { ID: string }) {
	const isStaminaAtMaximumValue = useRecoilValue(isStaminaAtMaximum)

	const mending = useMending()

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
						mending("stamina", ID)
					}}
					variant="outline-dark"
				>
					<span>Drink</span>
				</Button>
			</div>
		</OverlayTrigger>
	)
}

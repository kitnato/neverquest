import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { POPOVER_TRIGGER } from "@neverquest/data/general"
import { useMending } from "@neverquest/hooks/actions/useMending"
import { isReserveAtMaximum } from "@neverquest/state/reserves"

export function Elixir({ ID }: { ID: string }) {
	const isReserveAtMaximumStamina = useRecoilValue(isReserveAtMaximum("stamina"))

	const mending = useMending()

	return (
		<OverlayTrigger
			overlay={(
				<Tooltip>
					<span>Already at full stamina.</span>
				</Tooltip>
			)}
			trigger={isReserveAtMaximumStamina ? POPOVER_TRIGGER : []}
		>
			<div>
				<Button
					disabled={isReserveAtMaximumStamina}
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

import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { LABEL_FULL_HEALTH, POPOVER_TRIGGER } from "@neverquest/data/general"
import { useMending } from "@neverquest/hooks/actions/useMending"
import { isReserveAtMaximum } from "@neverquest/state/reserves"

export function Bandages({ ID }: { ID: string }) {
	const isReserveAtMaximumHealth = useRecoilValue(isReserveAtMaximum("health"))

	const mending = useMending()

	return (
		<OverlayTrigger
			overlay={(
				<Tooltip>
					<span>{LABEL_FULL_HEALTH}</span>
				</Tooltip>
			)}
			trigger={isReserveAtMaximumHealth ? POPOVER_TRIGGER : []}
		>
			<div>
				<Button
					disabled={isReserveAtMaximumHealth}
					onClick={() => {
						mending("health", ID)
					}}
					variant="outline-dark"
				>
					<span>Use</span>
				</Button>
			</div>
		</OverlayTrigger>
	)
}

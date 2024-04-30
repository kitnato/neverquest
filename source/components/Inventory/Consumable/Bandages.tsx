import { Button, OverlayTrigger, Tooltip } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { LABEL_FULL_HEALTH, POPOVER_TRIGGER } from "@neverquest/data/general"
import { useMending } from "@neverquest/hooks/actions/useMending"
import { isHealthAtMaximum } from "@neverquest/state/reserves"

export function Bandages({ ID }: { ID: string }) {
	const isHealthAtMaximumValue = useRecoilValue(isHealthAtMaximum)

	const mending = useMending()

	return (
		<OverlayTrigger
			overlay={(
				<Tooltip>
					<span>{LABEL_FULL_HEALTH}</span>
				</Tooltip>
			)}
			trigger={isHealthAtMaximumValue ? POPOVER_TRIGGER : []}
		>
			<div>
				<Button
					disabled={isHealthAtMaximumValue}
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

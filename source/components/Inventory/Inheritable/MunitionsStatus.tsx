import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { useDeltaText } from "@neverquest/hooks/useDeltaText"
import IconMunitions from "@neverquest/icons/munitions.svg?react"
import { munitionsCapacity } from "@neverquest/state/items"
import { formatNumber } from "@neverquest/utilities/formatters"

export function MunitionsStatus() {
	const munitionsCapacityValue = useRecoilValue(munitionsCapacity)

	useDeltaText({
		delta: "munitionsCapacity",
		state: munitionsCapacity,
	})

	return (
		<IconDisplay
			Icon={IconMunitions}
			iconProps={{ className: "small", overlayPlacement: "bottom" }}
			tooltip="Munitions"
		>
			<Stack direction="horizontal" gap={1}>
				<span>{formatNumber({ value: munitionsCapacityValue })}</span>
			</Stack>
		</IconDisplay>
	)
}

import type { Placement } from "react-bootstrap/esm/types"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import IconInfusionLevel from "@neverquest/icons/infusion-level.svg?react"
import { infusionLevel } from "@neverquest/state/items"
import type { Infusable } from "@neverquest/types/unions"
import { formatNumber } from "@neverquest/utilities/formatters"

export function InfusionLevelDisplay({
	infusable,
	overlayPlacement,
}: {
	infusable: Infusable
	overlayPlacement?: Placement
}) {
	const infusionLevelValue = useRecoilValue(infusionLevel(infusable))

	return (
		<IconDisplay
			Icon={IconInfusionLevel}
			iconProps={{ className: "small", overlayPlacement }}
			tooltip="Infusion level"
		>
			<span>{formatNumber({ value: infusionLevelValue })}</span>
		</IconDisplay>
	)
}

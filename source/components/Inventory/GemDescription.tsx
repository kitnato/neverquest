import { Stack } from "react-bootstrap"
import { IconImage } from "@neverquest/components/IconImage"
import { ELEMENTALS, GEMS } from "@neverquest/data/items"
import IconGear from "@neverquest/icons/gear.svg?react"
import IconPowerLevel from "@neverquest/icons/power-level.svg?react"
import type { Gem } from "@neverquest/types/unions"

export function GemDescription({ gem }: { gem: Gem }) {
	const { elemental } = GEMS[gem]
	const { color, Icon } = ELEMENTALS[elemental]

	return (
		<Stack gap={1}>
			<div>
				<span>Socketed into&nbsp;</span>

				<IconImage className="small" Icon={IconGear} />

				<span>&nbsp;gear,</span>
			</div>

			<div>
				<span>adds an elemental&nbsp;</span>

				<IconImage className="small" Icon={Icon} />

				<span className={color}>
&nbsp;
					{elemental}
&nbsp;
				</span>

				<span>effect</span>
			</div>

			<div>
				<span>based on&nbsp;</span>

				<IconImage className="small" Icon={IconPowerLevel} />

				<span>&nbsp;power level.</span>
			</div>
		</Stack>
	)
}

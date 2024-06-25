import { Stack } from "react-bootstrap"

import { DescriptionDisplay } from "@neverquest/components/DescriptionDisplay"
import { IconImage } from "@neverquest/components/IconImage"
import { LABEL_SEPARATOR } from "@neverquest/data/general"
import { ELEMENTALS, GEMS } from "@neverquest/data/items"
import { AILMENT_DESCRIPTION } from "@neverquest/data/monster"
import IconArmor from "@neverquest/icons/armor.svg?react"
import IconExtentHigh from "@neverquest/icons/extent-high.svg?react"
import IconExtentLow from "@neverquest/icons/extent-low.svg?react"
import IconExtentMedium from "@neverquest/icons/extent-medium.svg?react"
import IconGearLevel from "@neverquest/icons/gear-level.svg?react"
import IconGear from "@neverquest/icons/gear.svg?react"
import IconOneHanded from "@neverquest/icons/one-handed.svg?react"
import IconShield from "@neverquest/icons/shield.svg?react"
import IconThorns from "@neverquest/icons/thorns.svg?react"
import IconWeaponDamage from "@neverquest/icons/weapon-damage.svg?react"

import type { SVGIcon } from "@neverquest/types/general"
import type { Extent, Gem } from "@neverquest/types/unions"

const IconExtent: Record<Extent, SVGIcon> = {
	high: IconExtentHigh,
	low: IconExtentLow,
	medium: IconExtentMedium,
}

export function GemDescription({ gem }: { gem: Gem }) {
	const { elemental } = GEMS[gem]
	const { ailment, color, extent, Icon } = ELEMENTALS[elemental]
	const { description, descriptionIcons } = AILMENT_DESCRIPTION[ailment]

	return (
		<Stack gap={3}>
			<Stack>
				<Stack className="justify-content-center" direction="horizontal" gap={1}>
					<span>Sockets into</span>

					<IconImage className="small" Icon={IconGear} />

					<span>gear.</span>
				</Stack>

				<Stack className="justify-content-center" direction="horizontal" gap={1}>
					<span>Adds an elemental</span>

					<IconImage className="small" Icon={Icon} />

					<span className={color}>
						{elemental}
					</span>

					<span>
						effect:
					</span>
				</Stack>

				<DescriptionDisplay
					description={`Monster ${description.toLowerCase()}`}
					descriptionIcons={descriptionIcons}
				/>
			</Stack>

			<Stack gap={1}>
				<Stack className="justify-content-center" direction="horizontal" gap={1}>
					<IconImage className="small" Icon={IconOneHanded} />

					{LABEL_SEPARATOR}

					<IconImage className="small" Icon={IconExtent[extent]} />

					<IconImage className="small" Icon={IconWeaponDamage} />

					<span>weapon damage</span>
				</Stack>

				<Stack className="justify-content-center" direction="horizontal" gap={1}>
					<IconImage className="small" Icon={IconArmor} />

					{LABEL_SEPARATOR}

					<IconImage className="small" Icon={IconExtent[extent]} />

					<IconImage className="small" Icon={IconThorns} />

					<span>thorns based on</span>

					<IconImage className="small" Icon={IconGearLevel} />

					<span>gear level</span>
				</Stack>

				<Stack className="justify-content-center" direction="horizontal" gap={1}>
					<IconImage className="small" Icon={IconShield} />

					{LABEL_SEPARATOR}

					<span>bonus to damage, thorns and duration</span>
				</Stack>
			</Stack>
		</Stack>
	)
}

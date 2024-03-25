import { Stack } from "react-bootstrap"
import { IconImage } from "@neverquest/components/IconImage"
import { LABEL_SEPARATOR } from "@neverquest/data/general"
import { ELEMENTALS, GEMS } from "@neverquest/data/items"
import IconArmor from "@neverquest/icons/armor.svg?react"
import IconGearLevel from "@neverquest/icons/gear-level.svg?react"
import IconGear from "@neverquest/icons/gear.svg?react"
import IconOneHanded from "@neverquest/icons/one-handed.svg?react"
import IconShield from "@neverquest/icons/shield.svg?react"
import IconThorns from "@neverquest/icons/thorns.svg?react"
import IconWeaponDamage from "@neverquest/icons/weapon-damage.svg?react"
import type { Gem } from "@neverquest/types/unions"

export function GemDescription({ gem }: { gem: Gem }) {
	const { elemental } = GEMS[gem]
	const { color, Icon } = ELEMENTALS[elemental]

	return (
		<Stack gap={3}>
			<Stack>
				<Stack className="justify-content-center" direction="horizontal" gap={1}>
					<span>Socketed into</span>

					<IconImage className="small" Icon={IconGear} />

					<span>gear,</span>
				</Stack>

				<Stack className="justify-content-center" direction="horizontal" gap={1}>
					<span>adds an elemental</span>

					<IconImage className="small" Icon={Icon} />

					<span className={color}>
						{elemental}
					</span>

					<span>effect.</span>
				</Stack>
			</Stack>

			<Stack gap={1}>
				<Stack className="justify-content-center" direction="horizontal" gap={1}>
					<IconImage className="small" Icon={IconOneHanded} />

					{LABEL_SEPARATOR}

					<span>bonus to</span>

					<IconImage className="small" Icon={IconWeaponDamage} />

					<span>weapon damage</span>
				</Stack>

				<Stack className="justify-content-center" direction="horizontal" gap={1}>
					<IconImage className="small" Icon={IconArmor} />

					{LABEL_SEPARATOR}

					<span>grants</span>

					<IconImage className="small" Icon={IconThorns} />

					<span>thorns based on</span>

					<IconImage className="small" Icon={IconGearLevel} />

					<span>gear level</span>
				</Stack>

				<Stack className="justify-content-center" direction="horizontal" gap={1}>
					<IconImage className="small" Icon={IconShield} />

					{LABEL_SEPARATOR}

					<span>bonus to all</span>

					<IconImage className="small" Icon={Icon} />

					<span className={color}>
						{elemental}
					</span>

					<span>effects</span>
				</Stack>
			</Stack>
		</Stack>
	)
}

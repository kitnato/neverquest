import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { LABEL_SEPARATOR } from "@neverquest/data/general"
import { ELEMENTALS, GEMS } from "@neverquest/data/items"
import IconElemental from "@neverquest/icons/elemental.svg?react"
import { armor, elementalEffects, gems, weapon } from "@neverquest/state/gear"
import { formatNumber } from "@neverquest/utilities/formatters"
import { stackItems } from "@neverquest/utilities/helpers"

import type { GearItem, GearItemUnequipped } from "@neverquest/types"

export function ElementalDetails({ slot }: { slot: "armor" | "weapon" }) {
	const gemsValue = useRecoilValue(
		gems(useRecoilValue<GearItem | GearItemUnequipped>(slot === "armor" ? armor : weapon).ID),
	)
	const elementalEffectsValue = useRecoilValue(elementalEffects)

	if (gemsValue.length > 0) {
		return (
			<tr>
				<td>
					<IconDisplay Icon={IconElemental} iconProps={{ className: "small" }}>
						<span>Elemental:</span>
					</IconDisplay>
				</td>

				<td>
					<Stack gap={1}>
						{stackItems(
							gemsValue.toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2)),
						).map(({ item }) => {
							const { ID, name } = item
							const { elemental } = GEMS[name]
							const { color, Icon } = ELEMENTALS[elemental]
							const { damage, duration } = elementalEffectsValue[slot][elemental]

							return (
								<Stack direction="horizontal" gap={1} key={ID}>
									<span className={color}>
										+
										{formatNumber({ value: damage })}
									</span>

									{LABEL_SEPARATOR}

									<IconDisplay Icon={Icon} iconProps={{ className: "small" }}>
										<span>{formatNumber({ format: "time", value: duration })}</span>
									</IconDisplay>
								</Stack>
							)
						})}
					</Stack>
				</td>
			</tr>
		)
	}
}

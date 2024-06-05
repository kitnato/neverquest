import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { LABEL_SEPARATOR } from "@neverquest/data/general"
import { ELEMENTALS, GEMS } from "@neverquest/data/items"
import IconElemental from "@neverquest/icons/elemental.svg?react"
import { armor, elementalEffects, fittedGems, weapon } from "@neverquest/state/gear"
import { formatNumber } from "@neverquest/utilities/formatters"
import { stackItems } from "@neverquest/utilities/helpers"

export function ElementalDetails({ slot }: { slot: "armor" | "weapon" }) {
	const armorValue = useRecoilValue(armor)
	const fittedGemsValue = useRecoilValue(fittedGems)
	const elementalEffectsValue = useRecoilValue(elementalEffects)
	const weaponValue = useRecoilValue(weapon)

	const gems = fittedGemsValue[(slot === "armor" ? armorValue : weaponValue).ID] ?? []

	if (gems.length > 0) {
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
							gems.toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2)),
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

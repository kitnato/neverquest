import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { IconImage } from "@neverquest/components/IconImage"
import IconEssenceBonus from "@neverquest/icons/essence-bonus.svg?react"
import IconMonsterReduction from "@neverquest/icons/monster-reduction.svg?react"
import IconTransmute from "@neverquest/icons/transmute.svg?react"
import { generations } from "@neverquest/state/encounter"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getPerkEffect } from "@neverquest/utilities/getters"

export function Perks() {
	const generationsValue = useRecoilValue(generations)

	return (
		<Stack gap={3}>
			<h6>Perks</h6>

			<IconDisplay Icon={IconEssenceBonus} tooltip="Essence loot bonus">
				<Stack direction="horizontal" gap={3}>
					<span>
						+
						{formatNumber({
							format: "percentage",
							value: getPerkEffect({ generations: generationsValue, perk: "essenceBonus" }),
						})}
					</span>

					<IconImage className="small text-secondary" Icon={IconTransmute} />

					<span>
						+
						{formatNumber({
							format: "percentage",
							value: getPerkEffect({ generations: generationsValue + 1, perk: "essenceBonus" }),
						})}
					</span>
				</Stack>
			</IconDisplay>

			<IconDisplay
				Icon={IconMonsterReduction}
				iconProps={{ isFlipped: true }}
				tooltip="Monster reduction"
			>
				<Stack direction="horizontal" gap={3}>
					<span>
						-
						{formatNumber({
							format: "percentage",
							value: getPerkEffect({ generations: generationsValue, perk: "monsterReduction" }),
						})}
					</span>

					<IconImage className="small text-secondary" Icon={IconTransmute} />

					<span>
						-
						{formatNumber({
							format: "percentage",
							value: getPerkEffect({ generations: generationsValue + 1, perk: "monsterReduction" }),
						})}
					</span>
				</Stack>
			</IconDisplay>
		</Stack>
	)
}

import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { IconImage } from "@neverquest/components/IconImage"
import IconEssenceBonus from "@neverquest/icons/essence-bonus.svg?react"
import IconEssence from "@neverquest/icons/essence.svg?react"
import IconGeneration from "@neverquest/icons/generation.svg?react"
import IconMonsterReduction from "@neverquest/icons/monster-reduction.svg?react"
import IconPowerLevel from "@neverquest/icons/power-level.svg?react"
import IconTransmute from "@neverquest/icons/transmute.svg?react"
import { absorbedEssence } from "@neverquest/state/attributes"
import { generation } from "@neverquest/state/encounter"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getPerkEffect } from "@neverquest/utilities/getters"

export function Perks() {
	const absorbedEssenceValue = useRecoilValue(absorbedEssence)
	const generationValue = useRecoilValue(generation)

	return (
		<Stack gap={3}>
			<h6>Perks</h6>

			<IconDisplay
				description={(
					<Stack direction="horizontal" gap={1}>
						<span className="text-secondary">Based on current</span>

						<IconDisplay
							className="text-secondary"
							Icon={IconGeneration}
							iconProps={{ className: "small" }}
						>
							<span>generation</span>
						</IconDisplay>

						<span>and</span>

						<IconDisplay
							className="text-secondary"
							Icon={IconPowerLevel}
							iconProps={{ className: "small" }}
						>
							<span>power level.</span>
						</IconDisplay>
					</Stack>
				)}
				Icon={IconEssence}
				tooltip="Starting essence"
			>
				<span>
					{formatNumber({
						value: getPerkEffect({ generation: generationValue, perk: "startingEssence" }) * absorbedEssenceValue,
					})}
				</span>
			</IconDisplay>

			<IconDisplay Icon={IconEssenceBonus} tooltip="Essence loot bonus">
				<Stack direction="horizontal" gap={3}>
					<span>
						+
						{formatNumber({
							format: "percentage",
							value: getPerkEffect({ generation: generationValue, perk: "essenceBonus" }),
						})}
					</span>

					<IconImage className="small text-secondary" Icon={IconTransmute} />

					<span>
						+
						{formatNumber({
							format: "percentage",
							value: getPerkEffect({ generation: generationValue + 1, perk: "essenceBonus" }),
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
							value: getPerkEffect({ generation: generationValue, perk: "monsterReduction" }),
						})}
					</span>

					<IconImage className="small text-secondary" Icon={IconTransmute} />

					<span>
						-
						{formatNumber({
							format: "percentage",
							value: getPerkEffect({ generation: generationValue + 1, perk: "monsterReduction" }),
						})}
					</span>
				</Stack>
			</IconDisplay>
		</Stack>
	)
}

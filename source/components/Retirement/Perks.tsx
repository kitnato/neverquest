import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { DescriptionDisplay } from "@neverquest/components/DescriptionDisplay"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { IconImage } from "@neverquest/components/IconImage"
import IconEssenceBonus from "@neverquest/icons/essence-bonus.svg?react"
import IconEssence from "@neverquest/icons/essence.svg?react"
import IconGeneration from "@neverquest/icons/generation.svg?react"
import IconMonsterReduction from "@neverquest/icons/monster-reduction.svg?react"
import IconPowerLevel from "@neverquest/icons/power-level.svg?react"
import IconStage from "@neverquest/icons/stage.svg?react"
import IconTransmute from "@neverquest/icons/transmute.svg?react"
import { absorbedEssence } from "@neverquest/state/attributes"
import { generation, stage } from "@neverquest/state/character"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getPerkEffect } from "@neverquest/utilities/getters"

export function Perks() {
	const absorbedEssenceValue = useRecoilValue(absorbedEssence)
	const generationValue = useRecoilValue(generation)
	const stageValue = useRecoilValue(stage)

	return (
		<Stack gap={3}>
			<h6>Perks</h6>

			<IconDisplay
				description={(
					<DescriptionDisplay
						description="Based on current # generation and # power level."
						descriptionIcons={[IconGeneration, IconPowerLevel]}
					/>
				)}
				Icon={IconEssence}
				tooltip="Starting essence"
			>
				<span>
					{formatNumber({
						value: getPerkEffect({ generation: generationValue + 1, perk: "startingEssence" }) * absorbedEssenceValue,
					})}
				</span>
			</IconDisplay>

			<IconDisplay
				description={(
					<DescriptionDisplay
						description={`Until # stage ${stageValue}.`}
						descriptionIcons={[IconStage]}
					/>
				)}
				Icon={IconEssenceBonus}
				tooltip="Essence loot bonus"
			>
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

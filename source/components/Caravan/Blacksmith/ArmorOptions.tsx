import { ARMOR_CLASS_TYPES, type ArmorClass } from "@kitnato/locran/build/types"
import { useCallback, useEffect } from "preact/hooks"
import { DropdownButton, DropdownItem, Stack } from "react-bootstrap"
import { useRecoilState, useRecoilValue } from "recoil"

import { CraftedGear } from "@neverquest/components/Caravan/CraftedGear"
import { CraftGear } from "@neverquest/components/Caravan/CraftGear"
import { SetGearLevel } from "@neverquest/components/Caravan/SetGearLevel"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { ARMOR_SPECIFICATIONS, GEAR_LEVEL_RANGE_MAXIMUM } from "@neverquest/data/gear"
import { LABEL_SKILL_REQUIRED, LABEL_UNKNOWN, LEVELLING_MAXIMUM } from "@neverquest/data/general"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import IconBurden from "@neverquest/icons/burden.svg?react"
import IconDeflectionChance from "@neverquest/icons/deflection-chance.svg?react"
import IconArmorProtection from "@neverquest/icons/protection.svg?react"
import IconUnknown from "@neverquest/icons/unknown.svg?react"
import IconWeight from "@neverquest/icons/weight.svg?react"
import { blacksmithInventory, blacksmithOptions } from "@neverquest/state/caravan"
import { stageMaximum } from "@neverquest/state/character"
import { isSkillTrained } from "@neverquest/state/skills"
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters"
import { generateArmor } from "@neverquest/utilities/generators"
import {
	getAffixStructure,
	getArmorRanges,
	getFromRange,
	getSigmoid,
} from "@neverquest/utilities/getters"

export function ArmorOptions() {
	const [{ armor: craftedArmor }, setBlacksmithInventory] = useRecoilState(blacksmithInventory)
	const [
		{
			armor: { gearClass, level },
		},
		setBlacksmithOptions,
	] = useRecoilState(blacksmithOptions)
	const isSkillTrainedArmorcraft = useRecoilValue(isSkillTrained("armorcraft"))
	const isSkillTrainedImpermeability = useRecoilValue(isSkillTrained("impermeability"))
	const stageMaximumValue = useRecoilValue(stageMaximum)

	const progressQuest = useProgressQuest()

	const factor = getSigmoid(level)
	const { burden, deflectionChance, protection, weight } = getArmorRanges({
		factor,
		gearClass,
	})
	const isCrafted = craftedArmor !== undefined
	const maximumArmorLevel = Math.min(
		stageMaximumValue + GEAR_LEVEL_RANGE_MAXIMUM,
		LEVELLING_MAXIMUM,
	)

	const setGearLevel = useCallback(
		(level: number) => {
			setBlacksmithOptions(options => ({
				...options,
				armor: {
					...options.armor,
					level,
				},
			}))
		},
		[setBlacksmithOptions],
	)

	useEffect(() => {
		if (level === 0) {
			setGearLevel(Math.min(stageMaximumValue, LEVELLING_MAXIMUM))
		}
	}, [level, setGearLevel, stageMaximumValue])

	return (
		<Stack className="mx-auto w-50">
			<Stack
				className={`mx-auto${isCrafted ? " opacity-50" : ""}`}
				gap={3}
			>
				<SetGearLevel
					isDisabled={isCrafted}
					level={level}
					maximum={maximumArmorLevel}
					setLevel={setGearLevel}
				/>

				<IconDisplay
					Icon={ARMOR_SPECIFICATIONS[gearClass].Icon}
					iconProps={{ overlayPlacement: "left" }}
					tooltip="Class"
				>
					<DropdownButton
						disabled={isCrafted}
						onSelect={(key) => {
							if (key !== null) {
								setBlacksmithOptions(options => ({
									...options,
									armor: {
										...options.armor,
										gearClass: key as ArmorClass,
									},
								}))
							}
						}}
						title={capitalizeAll(gearClass)}
						variant="outline-dark"
					>
						{ARMOR_CLASS_TYPES.map(armorClassType => (
							<DropdownItem eventKey={armorClassType} key={armorClassType}>
								<span>{capitalizeAll(armorClassType)}</span>
							</DropdownItem>
						))}
					</DropdownButton>
				</IconDisplay>

				<IconDisplay
					Icon={IconArmorProtection}
					iconProps={{ overlayPlacement: "left" }}
					tooltip="Protection"
				>
					{formatNumber({ value: protection.minimum })}
					{" - "}
					{formatNumber({
						value: protection.maximum,
					})}
				</IconDisplay>

				<IconDisplay
					Icon={isSkillTrainedImpermeability ? IconDeflectionChance : IconUnknown}
					iconProps={{ overlayPlacement: "left" }}
					tooltip={isSkillTrainedImpermeability ? "Deflection chance" : LABEL_UNKNOWN}
				>
					{isSkillTrainedImpermeability
						? `${formatNumber({
							format: "percentage",
							value: deflectionChance.minimum,
						})} - ${formatNumber({ format: "percentage", value: deflectionChance.maximum })}`
						: LABEL_UNKNOWN}
				</IconDisplay>

				<IconDisplay Icon={IconBurden} iconProps={{ overlayPlacement: "left" }} tooltip="Burden">
					<span>
						{formatNumber({ value: burden.minimum })}
						{" - "}
						{formatNumber({
							value: burden.maximum,
						})}
					</span>
				</IconDisplay>

				<IconDisplay Icon={IconWeight} iconProps={{ overlayPlacement: "left" }} tooltip="Weight">
					<span>
						{formatNumber({ value: weight.minimum })}
						{" - "}
						{formatNumber({
							value: weight.maximum,
						})}
					</span>
				</IconDisplay>
			</Stack>

			<hr />

			{!isSkillTrainedArmorcraft && gearClass === "heavy"
				? <span className="fst-italic text-center">{LABEL_SKILL_REQUIRED}</span>

				: isCrafted
					? (
						<CraftedGear
							item={craftedArmor}
							onTransfer={() => {
								setBlacksmithInventory(currentBlacksmithInventory => ({
									...currentBlacksmithInventory,
									armor: undefined,
								}))
							}}
						/>
					)
					: (
						<CraftGear
							onCraft={() => {
								setBlacksmithInventory(currentBlacksmithInventory => ({
									...currentBlacksmithInventory,
									armor: generateArmor({
										affixStructure: getAffixStructure(),
										gearClass,
										level,
										prefixTags: level < maximumArmorLevel - GEAR_LEVEL_RANGE_MAXIMUM * 2
											? ["lowQuality"]
											: level === maximumArmorLevel
												? ["highQuality"]
												: undefined,
									}),
								}))

								progressQuest({ quest: "crafting" })
							}}
							price={Math.round(
								getFromRange({
									factor,
									...ARMOR_SPECIFICATIONS[gearClass].price,
								}),
							)}
						/>
					)}
		</Stack>
	)
}

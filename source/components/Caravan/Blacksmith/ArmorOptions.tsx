import { ARMOR_CLASS_TYPES, type ArmorClass } from "@kitnato/locran/build/types"
import { useCallback, useEffect } from "react"
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
import { stageMaximum } from "@neverquest/state/encounter"
import { isSkillAcquired } from "@neverquest/state/skills"
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
	const isSkillAcquiredArmorcraft = useRecoilValue(isSkillAcquired("armorcraft"))
	const isSkillAcquiredImpermeability = useRecoilValue(isSkillAcquired("impermeability"))
	const stageMaximumValue = useRecoilValue(stageMaximum)

	const progressQuest = useProgressQuest()

	const factor = getSigmoid(level)
	const { burden, deflection, protection, weight } = getArmorRanges({
		factor,
		gearClass,
	})
	const hasCrafted = craftedArmor !== undefined
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
			<Stack className={`mx-auto${hasCrafted ? " opacity-50" : ""}`} gap={3}>
				<SetGearLevel
					isDisabled={hasCrafted}
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
						disabled={hasCrafted}
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
							<DropdownItem as="button" eventKey={armorClassType} key={armorClassType}>
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
					&nbsp;-&nbsp;
					{formatNumber({
						value: protection.maximum,
					})}
				</IconDisplay>

				<IconDisplay
					Icon={isSkillAcquiredImpermeability ? IconDeflectionChance : IconUnknown}
					iconProps={{ overlayPlacement: "left" }}
					tooltip={isSkillAcquiredImpermeability ? "Deflection chance" : LABEL_UNKNOWN}
				>
					{isSkillAcquiredImpermeability
						? `${formatNumber({
							format: "percentage",
							value: deflection.minimum,
						})} - ${formatNumber({ format: "percentage", value: deflection.maximum })}`
						: LABEL_UNKNOWN}
				</IconDisplay>

				<IconDisplay Icon={IconBurden} iconProps={{ overlayPlacement: "left" }} tooltip="Burden">
					<span>
						{formatNumber({ value: burden.minimum })}
						&nbsp;-&nbsp;
						{formatNumber({
							value: burden.maximum,
						})}
					</span>
				</IconDisplay>

				<IconDisplay Icon={IconWeight} iconProps={{ overlayPlacement: "left" }} tooltip="Weight">
					<span>
						{formatNumber({ value: weight.minimum })}
						&nbsp;-&nbsp;
						{formatNumber({
							value: weight.maximum,
						})}
					</span>
				</IconDisplay>
			</Stack>

			<hr />

			{!isSkillAcquiredArmorcraft && gearClass === "heavy"
				? (
					<span className="fst-italic text-center">{LABEL_SKILL_REQUIRED}</span>
				)
				: (hasCrafted
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
											: (level === maximumArmorLevel
												? ["highQuality"]
												: undefined),
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
					))}
		</Stack>
	)
}

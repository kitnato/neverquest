import { WEAPON_CLASS_TYPES, type WeaponClass } from "@kitnato/locran/build/types"
import { useCallback, useEffect } from "react"
import { DropdownButton, DropdownItem, Stack } from "react-bootstrap"
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil"

import { CraftedGear } from "@neverquest/components/Caravan/CraftedGear"
import { CraftGear } from "@neverquest/components/Caravan/CraftGear"
import { SetGearLevel } from "@neverquest/components/Caravan/SetGearLevel"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import {
	GEAR_LEVEL_RANGE_MAXIMUM,
	WEAPON_BASE,
	WEAPON_MODIFIER,
	WEAPON_SPECIFICATIONS,
} from "@neverquest/data/gear"
import { LABEL_SKILL_REQUIRED, LABEL_UNKNOWN, LEVELLING_MAXIMUM } from "@neverquest/data/general"
import { WEAPON_ABILITY_SKILLS } from "@neverquest/data/skills"
import IconBurden from "@neverquest/icons/burden.svg?react"
import IconMunitions from "@neverquest/icons/munitions.svg?react"
import IconRange from "@neverquest/icons/range.svg?react"
import IconUnknown from "@neverquest/icons/unknown.svg?react"
import IconWeaponAttackRate from "@neverquest/icons/weapon-attack-rate.svg?react"
import IconWeaponDamage from "@neverquest/icons/weapon-damage.svg?react"
import IconWeight from "@neverquest/icons/weight.svg?react"
import { fletcherInventory, fletcherOptions } from "@neverquest/state/caravan"
import { stageMaximum } from "@neverquest/state/character"
import { isSkillTrained } from "@neverquest/state/skills"
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters"
import { generateRangedWeapon } from "@neverquest/utilities/generators"
import {
	getAffixStructure,
	getFromRange,
	getRangedRanges,
	getSigmoid,
} from "@neverquest/utilities/getters"

export function RangedOptions() {
	const [fletcherInventoryValue, setFletcherInventory] = useRecoilState(fletcherInventory)
	const [
		{
			ranged: { gearClass, level },
		},
		setFletcherOptions,
	] = useRecoilState(fletcherOptions)
	const isSkillTrainedArchery = useRecoilValue(isSkillTrained("archery"))
	const stageMaximumValue = useRecoilValue(stageMaximum)
	const resetFletcherInventory = useResetRecoilState(fletcherInventory)

	const { ability, IconAbility, IconGearClass } = WEAPON_SPECIFICATIONS[gearClass]

	const isSkillTrainedAbility = useRecoilValue(isSkillTrained(WEAPON_ABILITY_SKILLS[ability]))

	const factor = getSigmoid(level)
	const { abilityChance, burden, damage, munitionsCost, range, rate, weight } = getRangedRanges({
		factor,
		gearClass,
	})
	const hasCrafted = fletcherInventoryValue !== undefined
	const maximumWeaponLevel = Math.min(
		stageMaximumValue + GEAR_LEVEL_RANGE_MAXIMUM,
		LEVELLING_MAXIMUM,
	)

	const setGearLevel = useCallback(
		(level: number) => {
			setFletcherOptions(options => ({
				...options,
				ranged: {
					...options.ranged,
					level,
				},
			}))
		},
		[setFletcherOptions],
	)

	useEffect(() => {
		if (level === 0) {
			setGearLevel(Math.min(stageMaximumValue, LEVELLING_MAXIMUM))
		}
	}, [level, setGearLevel, stageMaximumValue])

	return (
		<Stack className="mx-auto w-50">
			<Stack
				className={`mx-auto${hasCrafted ? " opacity-50" : ""}`}
				gap={3}
			>
				<SetGearLevel
					isDisabled={hasCrafted}
					level={level}
					maximum={maximumWeaponLevel}
					setLevel={setGearLevel}
				/>

				<IconDisplay Icon={IconGearClass} iconProps={{ overlayPlacement: "left" }} tooltip="Class">
					<DropdownButton
						disabled={hasCrafted}
						onSelect={(key) => {
							if (key !== null) {
								setFletcherOptions(options => ({
									...options,
									ranged: {
										...options.ranged,
										gearClass: key as WeaponClass,
									},
								}))
							}
						}}
						title={capitalizeAll(gearClass)}
						variant="outline-dark"
					>
						{WEAPON_CLASS_TYPES.filter(weaponClassType => weaponClassType !== "slashing").map(
							weaponClassType => (
								<DropdownItem as="button" eventKey={weaponClassType} key={weaponClassType}>
									<span>{capitalizeAll(weaponClassType)}</span>
								</DropdownItem>
							),
						)}
					</DropdownButton>
				</IconDisplay>

				<IconDisplay
					Icon={IconWeaponDamage}
					iconProps={{ overlayPlacement: "left" }}
					tooltip="Damage"
				>
					<span>
						{formatNumber({ value: damage.minimum })}
						{" - "}
						{formatNumber({
							value: damage.maximum,
						})}
					</span>
				</IconDisplay>

				<IconDisplay
					Icon={IconWeaponAttackRate}
					iconProps={{ overlayPlacement: "left" }}
					tooltip="Attack rate"
				>
					<span>
						{formatNumber({ format: "time", value: rate.minimum })}
						{" - "}
						{formatNumber({
							format: "time",
							value: rate.maximum,
						})}
					</span>
				</IconDisplay>

				<IconDisplay
					Icon={IconMunitions}
					iconProps={{ overlayPlacement: "left" }}
					tooltip="Munitions cost"
				>
					<span>
						{formatNumber({ value: munitionsCost.minimum })}
						{" - "}
						{formatNumber({
							value: munitionsCost.maximum,
						})}
					</span>
				</IconDisplay>

				<IconDisplay Icon={IconRange} iconProps={{ overlayPlacement: "left" }} tooltip="Range">
					<span>
						{formatNumber({ format: "time", value: range.minimum })}
						{" - "}
						{formatNumber({
							format: "time",
							value: range.maximum,
						})}
					</span>
				</IconDisplay>

				<IconDisplay
					Icon={isSkillTrainedAbility ? IconAbility : IconUnknown}
					iconProps={{ overlayPlacement: "left" }}
					tooltip={isSkillTrainedAbility ? `${capitalizeAll(ability)} chance` : LABEL_UNKNOWN}
				>
					<span>
						{isSkillTrainedAbility
							? `${formatNumber({
								format: "percentage",
								value: abilityChance.minimum,
							})} - ${formatNumber({ format: "percentage", value: abilityChance.maximum })}`
							: LABEL_UNKNOWN}
					</span>
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

			{isSkillTrainedArchery
				? hasCrafted
					? (
						<CraftedGear
							item={fletcherInventoryValue}
							onTransfer={resetFletcherInventory}
						/>
					)
					: (
						<CraftGear
							onCraft={() => {
								setFletcherInventory(
									generateRangedWeapon({
										affixStructure: getAffixStructure(),
										gearClass,
										level,
										prefixTags: level < maximumWeaponLevel - GEAR_LEVEL_RANGE_MAXIMUM * 2
											? ["lowQuality"]
											: level === maximumWeaponLevel
												? ["highQuality"]
												: undefined,
									}),
								)
							}}
							price={Math.round(
								getFromRange({
									factor,
									...WEAPON_BASE.price,
								}) * WEAPON_MODIFIER.ranged.price,
							)}
						/>
					)

				: <span className="fst-italic text-center">{LABEL_SKILL_REQUIRED}</span>}
		</Stack>
	)
}

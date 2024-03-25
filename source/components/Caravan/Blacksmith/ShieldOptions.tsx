import { SHIELD_CLASS_TYPES, type ShieldClass } from "@kitnato/locran/build/types"
import { useCallback, useEffect } from "react"
import { DropdownButton, DropdownItem, Stack } from "react-bootstrap"
import { useRecoilState, useRecoilValue } from "recoil"

import { CraftedGear } from "@neverquest/components/Caravan/CraftedGear"
import { CraftGear } from "@neverquest/components/Caravan/CraftGear"
import { SetGearLevel } from "@neverquest/components/Caravan/SetGearLevel"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { GEAR_LEVEL_RANGE_MAXIMUM, SHIELD_SPECIFICATIONS } from "@neverquest/data/gear"
import { LABEL_SKILL_REQUIRED, LABEL_UNKNOWN, LEVELLING_MAXIMUM } from "@neverquest/data/general"
import IconBlockChance from "@neverquest/icons/block-chance.svg?react"
import IconBurden from "@neverquest/icons/burden.svg?react"
import IconStaggerChance from "@neverquest/icons/stagger-chance.svg?react"
import IconUnknown from "@neverquest/icons/unknown.svg?react"
import IconWeight from "@neverquest/icons/weight.svg?react"
import { blacksmithInventory, blacksmithOptions } from "@neverquest/state/caravan"
import { stageMaximum } from "@neverquest/state/encounter"
import { isSkillAcquired } from "@neverquest/state/skills"
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters"
import { generateShield } from "@neverquest/utilities/generators"
import {
	getAffixStructure,
	getFromRange,
	getShieldRanges,
	getSigmoid,
} from "@neverquest/utilities/getters"

export function ShieldOptions() {
	const [{ shield: craftedShield }, setBlacksmithInventory] = useRecoilState(blacksmithInventory)
	const [
		{
			shield: { gearClass, level },
		},
		setBlacksmithOptions,
	] = useRecoilState(blacksmithOptions)
	const isSkillAcquiredShieldcraft = useRecoilValue(isSkillAcquired("shieldcraft"))
	const stageMaximumValue = useRecoilValue(stageMaximum)

	const factor = getSigmoid(level)
	const { block, burden, stagger, weight } = getShieldRanges({
		factor,
		gearClass,
	})
	const hasCrafted = craftedShield !== undefined
	const maximumShieldLevel = Math.min(
		stageMaximumValue + GEAR_LEVEL_RANGE_MAXIMUM,
		LEVELLING_MAXIMUM,
	)

	const setGearLevel = useCallback(
		(level: number) => {
			setBlacksmithOptions(options => ({
				...options,
				shield: {
					...options.shield,
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
					maximum={maximumShieldLevel}
					setLevel={setGearLevel}
				/>

				<IconDisplay
					Icon={SHIELD_SPECIFICATIONS[gearClass].Icon}
					iconProps={{ overlayPlacement: "left" }}
					tooltip="Class"
				>
					<DropdownButton
						disabled={hasCrafted}
						onSelect={(key) => {
							if (key !== null) {
								setBlacksmithOptions(options => ({
									...options,
									shield: {
										...options.shield,
										gearClass: key as ShieldClass,
									},
								}))
							}
						}}
						title={capitalizeAll(gearClass)}
						variant="outline-dark"
					>
						{SHIELD_CLASS_TYPES.map(shieldClass => (
							<DropdownItem as="button" eventKey={shieldClass} key={shieldClass}>
								<span>{capitalizeAll(shieldClass)}</span>
							</DropdownItem>
						))}
					</DropdownButton>
				</IconDisplay>

				<IconDisplay
					Icon={IconBlockChance}
					iconProps={{ overlayPlacement: "left" }}
					tooltip="Block chance"
				>
					{formatNumber({ format: "percentage", value: block.minimum })}
					{" - "}
					{formatNumber({
						format: "percentage",
						value: block.maximum,
					})}
				</IconDisplay>

				<IconDisplay
					Icon={isSkillAcquiredShieldcraft ? IconStaggerChance : IconUnknown}
					iconProps={{ overlayPlacement: "left" }}
					tooltip={isSkillAcquiredShieldcraft ? "Stagger chance" : LABEL_UNKNOWN}
				>
					{isSkillAcquiredShieldcraft
						? `${formatNumber({ format: "percentage", value: stagger.minimum })} - ${formatNumber({
							format: "percentage",
							value: stagger.maximum,
						})}`
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

			{!isSkillAcquiredShieldcraft && gearClass === "tower"
				? (
					<span className="fst-italic text-center">{LABEL_SKILL_REQUIRED}</span>
				)
				: (hasCrafted
					? (
						<CraftedGear
							item={craftedShield}
							onTransfer={() => {
								setBlacksmithInventory(currentBlacksmithInventory => ({
									...currentBlacksmithInventory,
									shield: undefined,
								}))
							}}
						/>
					)
					: (
						<CraftGear
							onCraft={() => {
								setBlacksmithInventory(currentBlacksmithInventory => ({
									...currentBlacksmithInventory,
									shield: generateShield({
										affixStructure: getAffixStructure(),
										gearClass,
										level,
										prefixTags: level < maximumShieldLevel - GEAR_LEVEL_RANGE_MAXIMUM * 2
											? ["lowQuality"]
											: (level === maximumShieldLevel
												? ["highQuality"]
												: undefined),
									}),
								}))
							}}
							price={Math.round(
								getFromRange({
									factor,
									...SHIELD_SPECIFICATIONS[gearClass].price,
								}),
							)}
						/>
					))}
		</Stack>
	)
}

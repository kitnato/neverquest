import { DropdownButton, DropdownItem } from "react-bootstrap"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

import { BadgeMaximum } from "@neverquest/components/BadgeMaximum"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/general"
import { GEMS_MAXIMUM } from "@neverquest/data/items"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence"
import IconEssence from "@neverquest/icons/essence.svg?react"
import { armor, gems, shield, weapon } from "@neverquest/state/gear"
import { inventory } from "@neverquest/state/inventory"
import { essence } from "@neverquest/state/resources"
import { isTraitAcquired } from "@neverquest/state/traits"
import { isShowing } from "@neverquest/state/ui"
import { isGear, isMelee, isRanged, isUnarmed } from "@neverquest/types/type-guards"
import { GEAR_TYPES } from "@neverquest/types/unions"
import { getGearIcon, getGemFittingCost } from "@neverquest/utilities/getters"

import type { GemItem } from "@neverquest/types"

export function SocketGem({ gem }: { gem: GemItem }) {
	const armorValue = useRecoilValue(armor)
	const essenceValue = useRecoilValue(essence)
	const isTraitAcquiredColossus = useRecoilValue(isTraitAcquired("colossus"))
	const shieldValue = useRecoilValue(shield)
	const weaponValue = useRecoilValue(weapon)
	const setInventory = useSetRecoilState(inventory)
	const setIsShowing = {
		armor: useSetRecoilState(isShowing("armor")),
		shield: useSetRecoilState(isShowing("offhand")),
		weapon: useSetRecoilState(isShowing("weapon")),
	}

	const [armorGemsValue, setArmorGems] = useRecoilState(gems(armorValue.ID))
	const [shieldGemsValue, setShieldGems] = useRecoilState(gems(shieldValue.ID))
	const [weaponGemsValue, setWeaponGems] = useRecoilState(gems(weaponValue.ID))

	const gemFitting = {
		armor: {
			canFit: armorGemsValue.length < GEMS_MAXIMUM,
			gear: armorValue,
			gemsFitted: armorGemsValue.length,
			isAffordable: getGemFittingCost(armorGemsValue.length) <= essenceValue,
			setGems: setArmorGems,
		},
		shield: {
			canFit: shieldGemsValue.length < GEMS_MAXIMUM,
			gear: shieldValue,
			gemsFitted: shieldGemsValue.length,
			isAffordable: getGemFittingCost(shieldGemsValue.length) <= essenceValue,
			setGems: setShieldGems,
		},
		weapon: {
			canFit: weaponGemsValue.length < GEMS_MAXIMUM,
			gear: weaponValue,
			gemsFitted: weaponGemsValue.length,
			isAffordable: getGemFittingCost(weaponGemsValue.length) <= essenceValue,
			setGems: setWeaponGems,
		},
	}

	const progressQuest = useProgressQuest()
	const transactEssence = useTransactEssence()

	return (
		<DropdownButton
			onSelect={(slot) => {
				if (isGear(slot)) {
					const { gemsFitted, setGems } = gemFitting[slot]

					setGems(currentGems => [...currentGems, gem])
					setInventory(currentInventory =>
						currentInventory.filter(({ ID: itemID }) => itemID !== gem.ID),
					)

					setIsShowing[slot](true)

					transactEssence(-getGemFittingCost(gemsFitted))
					progressQuest({ quest: "gemsApplying" })

					if (
						GEAR_TYPES.filter(gear => gear !== slot).every(
							gear => gemFitting[gear].gemsFitted > 0,
						)
					) {
						progressQuest({ quest: "gemsApplyingAll" })
					}
				}
			}}
			title="Socket"
			variant="outline-dark"
		>
			{GEAR_TYPES.filter(gearType =>
				gearType === "shield"
					? (
						(
							(isMelee(weaponValue) || isUnarmed(weaponValue))
							&& weaponValue.grip === "one-handed"
						) || isTraitAcquiredColossus
					)
					&& !isRanged(weaponValue)
					: true,
			).map((gearType) => {
				const { canFit, gear, gemsFitted, isAffordable } = gemFitting[gearType]

				const canApply = canFit && isAffordable

				return (
					<DropdownItem disabled={!canApply} eventKey={gearType} key={gearType}>
						<div className={CLASS_FULL_WIDTH_JUSTIFIED}>
							<IconDisplay Icon={getGearIcon(gear)} iconProps={{ className: "small" }}>
								<span>{gear.name}</span>
							</IconDisplay>

							<div className="ms-2">
								{canFit
									? (
										<IconDisplay Icon={IconEssence} iconProps={{ className: "small" }}>
											<span>{getGemFittingCost(gemsFitted)}</span>
										</IconDisplay>
									)
									: <BadgeMaximum />}
							</div>
						</div>
					</DropdownItem>
				)
			})}
		</DropdownButton>
	)
}

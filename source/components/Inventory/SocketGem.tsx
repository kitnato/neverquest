import { DropdownButton, DropdownItem } from "react-bootstrap"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"

import { BadgeMaximum } from "@neverquest/components/BadgeMaximum"
import { IconDisplay } from "@neverquest/components/IconDisplay"
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/general"
import { GEMS_MAXIMUM } from "@neverquest/data/items"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence"
import IconEssence from "@neverquest/icons/essence.svg?react"
import { armor, fittedGems, shield, weapon } from "@neverquest/state/gear"
import { inventory } from "@neverquest/state/inventory"
import { essence } from "@neverquest/state/resources"
import { isTraitEarned } from "@neverquest/state/traits"
import { isShowing } from "@neverquest/state/ui"
import { isGear, isMelee, isRanged, isUnarmed } from "@neverquest/types/type-guards"
import { GEAR_TYPES } from "@neverquest/types/unions"
import { getGearIcon, getGemFittingCost } from "@neverquest/utilities/getters"

import type { GemItem } from "@neverquest/types"

export function SocketGem({ gem }: { gem: GemItem }) {
	const [fittedGemsValue, setFittedGems] = useRecoilState(fittedGems)
	const armorValue = useRecoilValue(armor)
	const essenceValue = useRecoilValue(essence)
	const isTraitEarnedColossus = useRecoilValue(isTraitEarned("colossus"))
	const shieldValue = useRecoilValue(shield)
	const weaponValue = useRecoilValue(weapon)
	const setInventory = useSetRecoilState(inventory)
	const setIsShowing = {
		armor: useSetRecoilState(isShowing("armor")),
		shield: useSetRecoilState(isShowing("offhand")),
		weapon: useSetRecoilState(isShowing("weapon")),
	}

	const armorGems = fittedGemsValue[armorValue.ID] ?? []
	const shieldGems = fittedGemsValue[shieldValue.ID] ?? []
	const weaponGems = fittedGemsValue[weaponValue.ID] ?? []

	const gemFitting = {
		armor: {
			canFit: armorGems.length < GEMS_MAXIMUM,
			gear: armorValue,
			gemsFitted: armorGems.length,
			isAffordable: getGemFittingCost(armorGems.length) <= essenceValue,
			itemID: armorValue.ID,
		},
		shield: {
			canFit: shieldGems.length < GEMS_MAXIMUM,
			gear: shieldValue,
			gemsFitted: shieldGems.length,
			isAffordable: getGemFittingCost(shieldGems.length) <= essenceValue,
			itemID: shieldValue.ID,
		},
		weapon: {
			canFit: weaponGems.length < GEMS_MAXIMUM,
			gear: weaponValue,
			gemsFitted: weaponGems.length,
			isAffordable: getGemFittingCost(weaponGems.length) <= essenceValue,
			itemID: weaponValue.ID,
		},
	}

	const progressQuest = useProgressQuest()
	const transactEssence = useTransactEssence()

	return (
		<DropdownButton
			onSelect={(slot) => {
				if (isGear(slot)) {
					const { gemsFitted, itemID } = gemFitting[slot]

					setFittedGems(currentFittedGems => ({
						...currentFittedGems,
						[itemID]: [...currentFittedGems[itemID] ?? [], gem],
					}))
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
					? ((
						(isMelee(weaponValue) || isUnarmed(weaponValue))
						&& weaponValue.grip === "one-handed"
					) || isTraitEarnedColossus)
					&& !isRanged(weaponValue)
					: true,
			).map((gearType) => {
				const { canFit, gear, gemsFitted, isAffordable } = gemFitting[gearType]

				const canSocket = canFit && isAffordable

				return (
					<DropdownItem disabled={!canSocket} eventKey={gearType} key={gearType}>
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

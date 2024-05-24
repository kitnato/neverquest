import { useRecoilCallback } from "recoil"

import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { armor, shield, weapon } from "@neverquest/state/gear"
import { isRelicEquipped } from "@neverquest/state/items"
import { questProgress, questStatuses } from "@neverquest/state/quests"
import { isSkillAcquired } from "@neverquest/state/skills"
import { isTraitAcquired } from "@neverquest/state/traits"
import { isShowing } from "@neverquest/state/ui"
import {
	isArmor,
	isMelee,
	isRanged,
	isRelicItem,
	isShield,
	isUnshielded,
	isWeapon,
} from "@neverquest/types/type-guards"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

import type { GearItem, RelicItem } from "@neverquest/types"

export function useToggleEquipItem() {
	const progressQuest = useProgressQuest()

	return useRecoilCallback(
		({ reset, set, snapshot }) =>
			({ forceUnequip, item }: { forceUnequip?: boolean, item: GearItem | RelicItem }) => {
				const get = getSnapshotGetter(snapshot)

				if (isRelicItem(item)) {
					const isRelicEquippedValue = isRelicEquipped(item.name)

					if (forceUnequip) {
						reset(isRelicEquippedValue)
					}
					else {
						set(isRelicEquippedValue, isEquipped => !isEquipped)
					}

					return
				}

				const armorValue = get(armor)
				const shieldValue = get(shield)
				const weaponValue = get(weapon)

				const { burden, gearClass, ID } = item
				const isArmorEquipped = isArmor(armorValue)
				const isShieldEquipped = isShield(shieldValue)
				const isWeaponEquipped = isWeapon(weaponValue)
				const isWeaponRanged = isRanged(item)
				const isWeaponTwoHanded = isMelee(item) && item.grip === "two-handed"

				if (isArmor(item)) {
					if (gearClass === "heavy" && !get(isSkillAcquired("armorcraft"))) {
						return
					}

					if (ID === armorValue.ID) {
						reset(armor)
					}
					else if (!forceUnequip) {
						set(armor, item)

						set(isShowing("armor"), true)
						set(isShowing("protection"), true)

						if (isShieldEquipped && isWeaponEquipped) {
							progressQuest({ quest: "equipping" })
						}
					}
				}

				if (isShield(item)) {
					if (gearClass === "tower" && !get(isSkillAcquired("shieldcraft"))) {
						return
					}

					if (ID === shieldValue.ID) {
						reset(shield)
					}
					else if (!forceUnequip) {
						set(shield, item)

						// Equipping a shield while a ranged or two-handed weapon is equipped un-equips the weapon (unless it's two-handed and the colossus trait is acquired).
						if (
							(isMelee(weaponValue) && weaponValue.grip === "two-handed" && !get(isTraitAcquired("colossus")))
							|| isRanged(weaponValue)
						) {
							reset(weapon)
						}

						set(isShowing("offhand"), true)

						if (isArmorEquipped && isWeaponEquipped) {
							progressQuest({ quest: "equipping" })
						}
					}
				}

				if (isWeapon(item)) {
					if (isWeaponTwoHanded && !get(isSkillAcquired("siegecraft"))) {
						return
					}

					if (isRanged(item) && !get(isSkillAcquired("archery"))) {
						return
					}

					if (ID === weaponValue.ID) {
						reset(weapon)
					}
					else if (!forceUnequip) {
						set(weapon, item)

						// Equipping a ranged or two-handed weapon while a shield is equipped un-equips the shield.
						if (
							(isWeaponRanged || (isWeaponTwoHanded && !get(isTraitAcquired("colossus"))))
							&& !isUnshielded(shieldValue)
						) {
							reset(shield)
						}

						if (isWeaponRanged || isWeaponTwoHanded) {
							set(isShowing("offhand"), true)
						}

						set(isShowing("damage"), true)
						set(isShowing("weapon"), true)

						if (isArmorEquipped && isShieldEquipped) {
							progressQuest({ quest: "equipping" })
						}
					}
				}

				if (burden > 0) {
					set(isShowing("stamina"), true)
				}

				if (get(questStatuses("survivingNoGear"))[0] === "incomplete") {
					set(questProgress("survivingNoGear"), Number.NEGATIVE_INFINITY)
				}
			},
		[progressQuest],
	)
}

import { useRecoilCallback } from "recoil"

import { useCanFit } from "@neverquest/hooks/actions/useCanFit"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { armor, shield, weapon } from "@neverquest/state/gear"
import { acquiredItems, inventory, notifyOverEncumbrance } from "@neverquest/state/inventory"
import { hasLootedLogEntry } from "@neverquest/state/items"
import { isSkillAcquired } from "@neverquest/state/skills"
import { isTraitAcquired } from "@neverquest/state/traits"
import { isShowing } from "@neverquest/state/ui"
import {
	isArmor,
	isGearItem,
	isGemItem,
	isMelee,
	isRanged,
	isRelicItem,
	isShield,
	isUnarmed,
	isUnarmored,
	isUnshielded,
} from "@neverquest/types/type-guards"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

import type { InventoryItem } from "@neverquest/types"

export function useAcquireItem() {
	const canFit = useCanFit()
	const progressQuest = useProgressQuest()

	return useRecoilCallback(
		({ set, snapshot }) =>
			(item: InventoryItem): "equip" | "failure" | "success" => {
				const get = getSnapshotGetter(snapshot)

				if (!canFit(item.weight)) {
					set(notifyOverEncumbrance, true)

					return "failure"
				}

				if (isRelicItem(item) && item.name === "knapsack") {
					set(isShowing("weight"), true)
				}
				else {
					set(acquiredItems, currentAcquiredItems => [...currentAcquiredItems, item])
				}

				if (isGemItem(item)) {
					progressQuest({ quest: "acquiringGems" })
				}

				if (isRelicItem(item)) {
					switch (item.name) {
						case "[P71NQ]": {
							set(hasLootedLogEntry, true)

							progressQuest({ quest: "acquiringLogEntry" })
							break
						}

						case "dream catcher": {
							progressQuest({ quest: "acquiringDreamCatcher" })
							break
						}

						case "familiar": {
							progressQuest({ quest: "acquiringFamiliar" })
							break
						}

						case "memento": {
							progressQuest({ quest: "acquiringMemento" })
							break
						}

						case "torn manuscript": {
							progressQuest({ quest: "acquiringTornManuscript" })
							break
						}

						default: {
							break
						}
					}
				}

				set(inventory, currentInventory => [...currentInventory, item])

				const isItemMelee = isMelee(item)
				const isItemRanged = isRanged(item)
				const isShieldUnequipped = isUnshielded(get(shield))
				const weaponValue = get(weapon)

				if (isGearItem(item)) {
					if (isItemMelee && item.grip === "two-handed") {
						progressQuest({ quest: "acquiringTwoHanded" })
					}

					if (isItemRanged) {
						progressQuest({ quest: "acquiringRanged" })
					}

					if (
						(isUnarmored(get(armor)) && isArmor(item))
						// Acquiring a shield while no shield equipped and not wielding a ranged weapon nor two-handed weapon, unless colossus.
						|| (isShieldUnequipped
						&& isShield(item)
						&& !isRanged(weaponValue)
						&& (isMelee(weaponValue) || isUnarmed(weaponValue))
						&& (weaponValue.grip === "one-handed" || get(isTraitAcquired("colossus"))))
						// Acquiring a weapon while no weapon equipped, and if it's ranged or two-handed, having no shield equipped.
						|| (isUnarmed(weaponValue)
						&& ((isItemMelee && item.grip === "one-handed")
						|| get(isTraitAcquired("colossus"))
						|| (isShieldUnequipped
						&& ((isItemMelee && item.grip === "two-handed")
						|| (get(isSkillAcquired("archery")) && isItemRanged)))))
					) {
						return "equip"
					}
				}

				return "success"
			},
		[canFit, progressQuest],
	)
}

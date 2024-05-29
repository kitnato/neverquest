import { useRecoilCallback } from "recoil"

import { useCanFit } from "@neverquest/hooks/actions/useCanFit"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { armor, shield, weapon } from "@neverquest/state/gear"
import { acquiredItems, inventory, notifyOverEncumbrance, ownedItem } from "@neverquest/state/inventory"
import { isInheritableLooted } from "@neverquest/state/items"
import { isSkillTrained } from "@neverquest/state/skills"
import { isTraitEarned } from "@neverquest/state/traits"
import { isShowing } from "@neverquest/state/ui"
import {
	isArmor,
	isGearItem,
	isGemItem,
	isInheritableItem,
	isMelee,
	isRanged,
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
					if (get(ownedItem("knapsack")) !== undefined) {
						set(notifyOverEncumbrance, true)
					}

					return "failure"
				}

				if (item.name !== "knapsack") {
					set(acquiredItems, currentAcquiredItems => [...currentAcquiredItems, item])
				}

				if (isGemItem(item)) {
					progressQuest({ quest: "acquiringGems" })
				}

				if (isInheritableItem(item)) {
					switch (item.name) {
						case "[S751NQ]": {
							set(isInheritableLooted("[S751NQ]"), true)

							progressQuest({ quest: "acquiringLogEntry" })
							break
						}

						case "dream catcher": {
							set(isInheritableLooted("dream catcher"), true)

							progressQuest({ quest: "acquiringDreamCatcher" })
							break
						}

						case "familiar": {
							set(isInheritableLooted("familiar"), true)

							progressQuest({ quest: "acquiringFamiliar" })
							break
						}

						case "knapsack": {
							set(isShowing("weight"), true)
							break
						}

						case "memento": {
							set(isInheritableLooted("memento"), true)

							progressQuest({ quest: "acquiringMemento" })
							break
						}

						case "mysterious egg": {
							set(isInheritableLooted("mysterious egg"), true)
							break
						}

						case "torn manuscript": {
							set(isInheritableLooted("torn manuscript"), true)

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

					// Auo-equip if ...
					if (
						// .. acquiring armor while none is equipped, or
						(isUnarmored(get(armor)) && isArmor(item))
						// .... acquiring a shield while no shield is equipped and not wielding a ranged weapon nor two-handed weapon, unless colossus trait has been earned, or
						|| (
							isShieldUnequipped
							&& isShield(item)
							&& !isRanged(weaponValue)
							&& (isMelee(weaponValue) || isUnarmed(weaponValue))
							&& (weaponValue.grip === "one-handed" || get(isTraitEarned("colossus")))
						)
						// ... acquiring a weapon while no weapon is equipped, and if it's ranged or two-handed, having no shield equipped, unless colossus trait has been earned.
						|| (
							isUnarmed(weaponValue)
							&& (
								(isItemMelee && item.grip === "one-handed")
								|| get(isTraitEarned("colossus"))
								|| (
									isShieldUnequipped
									&& (
										(isItemMelee && item.grip === "two-handed")
										|| (isItemRanged && get(isSkillTrained("archery")))
									)
								)
							)
						)
					) {
						return "equip"
					}
				}

				return "success"
			},
		[canFit, progressQuest],
	)
}

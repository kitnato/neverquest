import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { SellItem } from "@neverquest/components/Caravan/Merchant/SellItem"
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay"
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/general"
import { armor, shield, weapon } from "@neverquest/state/gear"
import { inventory } from "@neverquest/state/inventory"
import {
	isArmor,
	isConsumableItem,
	isGearItem,
	isGemItem,
	isInheritableItem,
	isShield,
	isWeapon,
} from "@neverquest/types/type-guards"
import { stackItems } from "@neverquest/utilities/helpers"

import type { Armor, Shield, Weapon } from "@neverquest/types"

export function SellItems() {
	const armorValue = useRecoilValue(armor)
	const inventoryValue = useRecoilValue(inventory)
	const shieldValue = useRecoilValue(shield)
	const weaponValue = useRecoilValue(weapon)

	const equippedGear = [weaponValue, armorValue, shieldValue].filter(
		gearItem => isArmor(gearItem) || isShield(gearItem) || isWeapon(gearItem),
	) as (Armor | Shield | Weapon)[]
	const equippedGearIDs = new Set(equippedGear.map(({ ID }) => ID))
	const storedItems = inventoryValue.filter(item => !equippedGearIDs.has(item.ID))

	return (
		<Stack gap={3}>
			<h6>Sell items</h6>

			{inventoryValue.length === 0
				? <span className="fst-italic">Nothing to sell.</span>

				: (
					<Stack gap={3}>
						{storedItems
							.filter(isGearItem)
							.toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2))
							.map(gearItem => (
								<div className={CLASS_FULL_WIDTH_JUSTIFIED} key={gearItem.ID}>
									<ItemDisplay item={gearItem} />

									<SellItem item={gearItem} />
								</div>
							))}

						{equippedGear.map((gearItem) => {
							return (
								<div className={CLASS_FULL_WIDTH_JUSTIFIED} key={gearItem.ID}>
									<ItemDisplay isEquipped item={gearItem} />

									<SellItem item={gearItem} />
								</div>
							)
						})}

						{storedItems
							.filter(isInheritableItem)
							.toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2))
							.map(inheritableItem => (
								<div className={CLASS_FULL_WIDTH_JUSTIFIED} key={inheritableItem.ID}>
									<ItemDisplay item={inheritableItem} />

									<SellItem item={inheritableItem} />
								</div>
							))}

						{[
							...stackItems(
								storedItems
									.filter(isConsumableItem)
									.toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2)),
							),
							...stackItems(
								storedItems
									.filter(isGemItem)
									.toSorted(({ name: name1 }, { name: name2 }) => name1.localeCompare(name2)),
							),
						].map(({ amount, item }) => (
							<div className={CLASS_FULL_WIDTH_JUSTIFIED} key={item.ID}>
								<ItemDisplay amount={amount} item={item} />

								<SellItem item={item} />
							</div>
						))}
					</Stack>
				)}
		</Stack>
	)
}

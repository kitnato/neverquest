import { useRecoilCallback } from "recoil"

import { useToggleEquipItem } from "@neverquest/hooks/actions/useToggleEquipItem"
import { knapsackCapacity } from "@neverquest/state/inventory"
import {
	ammunition,
	ammunitionCapacity,
	infusion,
	infusionLevel,
	tears,
} from "@neverquest/state/items"
import type { InventoryItem } from "@neverquest/types"
import { isInfusableItem, isRelicItem } from "@neverquest/types/type-guards"

export function useNeutralize() {
	const toggleEquipItem = useToggleEquipItem()

	return useRecoilCallback(
		({ reset }) =>
			({ item }: { item: InventoryItem }) => {
				if (isInfusableItem(item)) {
					const { name } = item

					reset(infusion(name))
					reset(infusionLevel(name))
				}

				if (isRelicItem(item)) {
					const { name } = item

					toggleEquipItem({ forceUnequip: true, item })

					if (name === "ammunition pouch") {
						reset(ammunition)
						reset(ammunitionCapacity)
					}

					if (name === "knapsack") {
						reset(knapsackCapacity)
					}

					if (name === "lacrimatory") {
						reset(tears)
					}
				}
			},
		[toggleEquipItem],
	)
}

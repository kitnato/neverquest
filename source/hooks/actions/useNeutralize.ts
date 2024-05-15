import { useRecoilCallback } from "recoil"

import { useToggleEquipItem } from "@neverquest/hooks/actions/useToggleEquipItem"
import { knapsackCapacity } from "@neverquest/state/inventory"
import {
	infusion,
	infusionLevel,
	munitionsCapacity,
	tears,
} from "@neverquest/state/items"
import { isInfusableItem, isRelicItem } from "@neverquest/types/type-guards"

import type { InventoryItem } from "@neverquest/types"

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

					if (name === "munitions satchel") {
						reset(munitionsCapacity)
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

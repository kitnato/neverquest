import { computed } from "@preact/signals"

import { ENCUMBRANCE_CAPACITY, KNAPSACK_CAPACITY } from "@neverquest/data/items"
import { isConsumableItem, isInheritableItem } from "@neverquest/types/type-guards"
import { computedFamily, persistentSignal } from "@neverquest/utilities/persistentSignal"

import type { InventoryItem } from "@neverquest/types"
import type { Consumable, Inheritable } from "@neverquest/types/unions"

// COMPUTED

export const encumbrance = computed(() => inventory.get().reduce((sum, { weight }) => sum + weight, 0))

export const encumbranceExtent = computed(() => {
	const encumbranceValue = encumbrance.value
	const encumbranceMaximumValue = encumbranceMaximum.value

	return encumbrance.value === encumbranceMaximum.value
		? "encumbered"
		: encumbranceValue > encumbranceMaximumValue
			? "over-encumbered"
			: undefined
})

export const encumbranceMaximum = computed(() => ownedItem("knapsack").value === undefined
	? ENCUMBRANCE_CAPACITY
	: knapsackCapacity.get(),
)

export const ownedItem = computedFamily((itemName: Consumable | Inheritable) => () => {
	const inventoryValue = inventory.get()

	return (
		inventoryValue.filter(isConsumableItem).find(({ name }) => name === itemName)
		?? inventoryValue.filter(isInheritableItem).find(({ name }) => name === itemName)
	)
})

// SIGNALS

export const acquiredItems = persistentSignal<InventoryItem[]>({
	key: "",
	value: [],
})

export const inventory = persistentSignal<InventoryItem[]>({
	key: "",
	value: [],
})

export const knapsackCapacity = persistentSignal({
	key: "",
	value: KNAPSACK_CAPACITY.minimum,
})

export const notifyOverEncumbrance = persistentSignal({
	key: "",
	value: false,
})

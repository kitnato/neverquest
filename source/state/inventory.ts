import { atom, selector, selectorFamily } from "recoil"

import { ENCUMBRANCE_CAPACITY, KNAPSACK_CAPACITY } from "@neverquest/data/items"
import { handleStorage } from "@neverquest/state/effects/handleStorage"
import { isConsumableItem, isInheritableItem } from "@neverquest/types/type-guards"
import { withStateKey } from "@neverquest/utilities/helpers"

import type { ConsumableItem, InheritableItem, InventoryItem } from "@neverquest/types"
import type { Consumable, Inheritable } from "@neverquest/types/unions"

// SELECTORS

export const encumbrance = withStateKey("encumbrance", key =>
	selector({
		get: ({ get }) => get(inventory).reduce((sum, { weight }) => sum + weight, 0),
		key,
	}),
)

export const encumbranceExtent = withStateKey("encumbranceExtent", key =>
	selector({
		get: ({ get }) =>
			get(encumbrance) === get(encumbranceMaximum)
				? "encumbered"
				: get(encumbrance) > get(encumbranceMaximum)
					? "over-encumbered"
					: undefined,
		key,
	}),
)

export const encumbranceMaximum = withStateKey("encumbranceMaximum", key =>
	selector({
		get: ({ get }) =>
			get(ownedItem("knapsack")) === undefined
				? ENCUMBRANCE_CAPACITY
				: get(knapsackCapacity),
		key,
	}),
)

export const ownedItem = withStateKey("ownedItem", key =>
	selectorFamily({
		get: (itemName: Consumable | Inheritable) =>
			({ get }): ConsumableItem | InheritableItem | undefined => {
				const inventoryValue = get(inventory)

				return (
					inventoryValue.filter(isConsumableItem).find(({ name }) => name === itemName)
					?? inventoryValue.filter(isInheritableItem).find(({ name }) => name === itemName)
				)
			},
		key,
	}),
)

// ATOMS

export const acquiredItems = withStateKey("acquiredItems", key =>
	atom<InventoryItem[]>({
		default: [],
		effects: [handleStorage({ key })],
		key,
	}),
)

export const inventory = withStateKey("inventory", key =>
	atom<InventoryItem[]>({
		default: [],
		effects: [handleStorage({ key })],
		key,
	}),
)

export const knapsackCapacity = withStateKey("knapsackCapacity", key =>
	atom({
		default: KNAPSACK_CAPACITY.minimum,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const notifyOverEncumbrance = withStateKey("notifyOverEncumbrance", key =>
	atom({
		default: false,
		effects: [handleStorage({ key })],
		key,
	}),
)

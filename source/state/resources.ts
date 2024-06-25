import { computed } from "@preact/signals"

import { persistentSignal } from "@neverquest/utilities/persistentSignal"

import type { InventoryItem } from "@neverquest/types"

// COMPUTED

export const isLootAvailable = computed(() => essenceLoot.get() > 0 || itemsLoot.get().length > 0)

// SIGNALS

export const essence = persistentSignal({
	key: "essence",
	value: 0,
})

export const essenceLoot = persistentSignal({
	key: "essenceLoot",
	value: 0,
})

export const itemsLoot = persistentSignal<InventoryItem[]>({
	key: "itemsLoot",
	value: [],
})

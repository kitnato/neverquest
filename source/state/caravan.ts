import { computed } from "@preact/signals"

import { CREW, MONOLOGUE_EMPTY } from "@neverquest/data/caravan"
import {
	CREW_MEMBER_TYPES,
	type CrewMember,
	type FletcherOption,
	type Gear,
	type Grip,
} from "@neverquest/types/unions"
import { persistentSignal, persistentSignalFamily } from "@neverquest/utilities/persistentSignal"

import type { ArmorClass, ShieldClass, WeaponClass } from "@kitnato/locran/build/types"
import type { Armor, Melee, MerchantInventoryItem, Ranged, Shield } from "@neverquest/types"

// COMPUTED

export const isCaravanHired = computed(() => CREW_MEMBER_TYPES.every(crewMember => isHired(crewMember).get()))

// SIGNALS

export const activeCrewMember = persistentSignal<CrewMember | null>({
	key: "activeCrewMember",
	value: null,
})

export const blacksmithInventory = persistentSignal<{
	armor: Armor | null
	shield: Shield | null
	weapon: Melee | null
}>({
	key: "blacksmithInventory",
	value: {
		armor: null,
		shield: null,
		weapon: null,
	},
})

export const blacksmithOptions = persistentSignal<{
	activeTab: Gear
	armor: {
		gearClass: ArmorClass
		level: number
	}
	shield: {
		gearClass: ShieldClass
		level: number
	}
	weapon: {
		gearClass: WeaponClass
		grip: Grip
		level: number
	}
}>(
	{
		key: "blacksmithOptions",
		value: {
			activeTab: "weapon",
			armor: {
				gearClass: "light",
				level: 0,
			},
			shield: {
				gearClass: "small",
				level: 0,
			},
			weapon: {
				gearClass: "blunt",
				grip: "one-handed",
				level: 0,
			},
		},
	})

export const expandedBuyback = persistentSignal({
	key: "expandedBuyback",
	value: true,
})

export const fletcherInventory = persistentSignal<Ranged | null>({
	key: "fletcherInventory",
	value: null,
})

export const fletcherOptions = persistentSignal<{
	activeTab: FletcherOption
	ranged: {
		gearClass: WeaponClass
		level: number
	}
}>({
	key: "fletcherOptions",
	value: {
		activeTab: "ranged",
		ranged: {
			gearClass: "blunt",
			level: 0,
		},
	},
})

export const isHired = persistentSignalFamily<CrewMember, boolean>({
	key: "isHired",
	value: false,
})

export const isOfferGenerated = persistentSignalFamily<number, boolean>({
	key: "isOfferGenerated",
	value: false,
})

export const merchantInventory = persistentSignal<MerchantInventoryItem[]>({
	key: "merchantInventory",
	value: [],
})

export const monologue = persistentSignalFamily<CrewMember, string>({
	key: "monologue",
	value: crewMember => CREW[crewMember].monologues[1] ?? MONOLOGUE_EMPTY,
})

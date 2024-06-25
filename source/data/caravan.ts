import { LEVELLING_END, LEVELLING_MAXIMUM } from "@neverquest/data/general"
import { CONSUMABLES, INFUSABLES, RELICS } from "@neverquest/data/items"
import { BLIGHT, FINALITY_STAGE, POISON, RAGE } from "@neverquest/data/monster"
import { RETIREMENT_STAGE } from "@neverquest/data/retirement"
import IconAlchemist from "@neverquest/icons/alchemist.svg?react"
import IconAttributes from "@neverquest/icons/attributes.svg?react"
import IconBandages from "@neverquest/icons/bandages.svg?react"
import IconBlacksmith from "@neverquest/icons/blacksmith.svg?react"
import IconEncumbrance from "@neverquest/icons/encumbrance.svg?react"
import IconFletcher from "@neverquest/icons/fletcher.svg?react"
import IconGear from "@neverquest/icons/gear.svg?react"
import IconGems from "@neverquest/icons/gems.svg?react"
import IconKnapsack from "@neverquest/icons/knapsack.svg?react"
import IconMedic from "@neverquest/icons/medic.svg?react"
import IconMending from "@neverquest/icons/mending.svg?react"
import IconMercenary from "@neverquest/icons/mercenary.svg?react"
import IconMerchant from "@neverquest/icons/merchant.svg?react"
import IconMunitions from "@neverquest/icons/munitions.svg?react"
import IconOccultist from "@neverquest/icons/occultist.svg?react"
import IconPhylactery from "@neverquest/icons/phylactery.svg?react"
import IconPotions from "@neverquest/icons/potions.svg?react"
import IconRanged from "@neverquest/icons/ranged.svg?react"
import IconRituals from "@neverquest/icons/rituals.svg?react"
import IconSkills from "@neverquest/icons/skills.svg?react"
import IconTailor from "@neverquest/icons/tailor.svg?react"
import IconWitch from "@neverquest/icons/witch.svg?react"

import type {
	ArmorClass,
	ArtifactType,
	ShieldClass,
	WeaponClass,
	WeaponModality,
} from "@kitnato/locran/build/types"
import type { InheritableItem } from "@neverquest/types"
import type { Description, SVGIcon } from "@neverquest/types/general"
import type { Consumable, CrewMember, Grip, Showing } from "@neverquest/types/unions"

export const MONOLOGUE_EMPTY = "..."

export const CREW: Record<
	CrewMember,
	Description & {
		Icon: SVGIcon
		interaction: string
		monologues: Record<number, string | undefined>
		price: number
		requiredStage: number
		shows?: Showing[]
	}
> = {
	alchemist: {
		description: "Converts # gems between one another. May impart a venerable # skill.",
		descriptionIcons: [IconGems, IconSkills],
		Icon: IconAlchemist,
		interaction: "Visit",
		monologues: {
			1: "Things are not always what they seem.",
			[FINALITY_STAGE["res dominus"]]: "Cryptic relics reveal their true purpose once suffused with essence.",
			[LEVELLING_END]: MONOLOGUE_EMPTY,
			[LEVELLING_MAXIMUM]: "Nothing makes any sense.",
		},
		price: 500,
		requiredStage: 25,
	},
	blacksmith: {
		description: "Crafts and identifies # gear.",
		descriptionIcons: [IconGear],
		Icon: IconBlacksmith,
		interaction: "Forge",
		monologues: {
			1: "In need of better gear?",
			[LEVELLING_END]: MONOLOGUE_EMPTY,
			[LEVELLING_MAXIMUM]: "Doesn't make a difference.",
		},
		price: 50,
		requiredStage: 12,
		shows: ["gearClass", "gearLevel"],
	},
	fletcher: {
		description: "Makes # ranged weapons and # munitions.",
		descriptionIcons: [IconRanged, IconMunitions],
		Icon: IconFletcher,
		interaction: "Craft",
		monologues: {
			1: "Tired of monster breath? Don't forget to rearm.",
			[LEVELLING_END]: MONOLOGUE_EMPTY,
			[LEVELLING_MAXIMUM]: "There's too many of them.",
		},
		price: 150,
		requiredStage: 18,
	},
	medic: {
		description: "Offers # mending and sells # bandages.",
		descriptionIcons: [IconMending, IconBandages],
		Icon: IconMedic,
		interaction: "Treat",
		monologues: {
			1: "Allow me to patch you up.",
			[LEVELLING_END]: MONOLOGUE_EMPTY,
			[LEVELLING_MAXIMUM]: "Never-ending agony.",
		},
		price: 20,
		requiredStage: 5,
	},
	mercenary: {
		description: "Trains # skills and unlocks # attributes.",
		descriptionIcons: [IconSkills, IconAttributes],
		Icon: IconMercenary,
		interaction: "Train",
		monologues: {
			1: "I can teach, if you can learn.",
			[LEVELLING_END]: MONOLOGUE_EMPTY,
			[LEVELLING_MAXIMUM]: "Why do they bleed? How?",
		},
		price: 80,
		requiredStage: 15,
	},
	merchant: {
		description: "Offers various items for purchase and buys unwanted items.",
		Icon: IconMerchant,
		interaction: "Trade",
		monologues: {
			1: "Greetings. What are you looking for?",
			4: "Good to have you back.",
			5: "Heard there are other travelers looking to sell their services.",
			6: "Peruse at your leisure.",
			7: "Plenty of monsters out there.",
			9: "There is something looming on the horizon ...",
			10: "I can't believe you came out of that in one piece.",
			12: "Have you appraised all my offerings?",
			14: "There's more trouble ahead.",
			15: "Once again you emerge victorious!",
			16: "The grind beckons.",
			19: "May our hearth be a beacon for your replenishment.",
			[RAGE.requiredStage - 1]: "The foul creatures seem even more irate than usual.",
			22: "Always a sight for sore eyes.",
			26: "Dreariness lifts with your arrival.",
			30: "Yet you return for more punishment?",
			31: "Your headway in the wilderness is helping business.",
			41: "Still you press on. There must be an answer.",
			[POISON.requiredStage - 1]:
				"Beware, some monsters have been witnessed spewing venomous ichor.",
			[POISON.requiredStage]: "You are resilient to put yourself through this.",
			[BLIGHT.requiredStage - 1]:
				"These abominations are becoming ever more pestilent. Be prepared.",
			[BLIGHT.requiredStage]: "Your bravery is unmatched. Will it be enough?",
			[FINALITY_STAGE["res dominus"] - 1]: "Dark tides are impending.",
			[FINALITY_STAGE["res dominus"]]: "The portents are truly dire ...",
			[FINALITY_STAGE["res dominus"] + 1]: "Delving further must be our salvation.",
			[LEVELLING_MAXIMUM - 1]: "Something's wrong.",
			[LEVELLING_END]: "All is truly lost.",
			[LEVELLING_MAXIMUM + 4]: "Please go back to where you came from.",
			[LEVELLING_MAXIMUM + 8]: "This is all wrong. I don't understand.",
			[LEVELLING_MAXIMUM + 12]: "Why? Emptiness never-ending ...",
			[LEVELLING_MAXIMUM + 16]: "Inescapable. Unfathomable. Inside everything.",
			[LEVELLING_MAXIMUM + 20]: "Please ... the pain ...",
			[LEVELLING_MAXIMUM]: "How are you still here?",
			[RETIREMENT_STAGE + 1]: "A sea of monsters ... is it endless?",
			[RETIREMENT_STAGE]: "Retirement? Pretty sure you're trapped here with us.",
		},
		price: 1,
		requiredStage: 1,
	},
	occultist: {
		description:
			"Sells # phylacteries and offers purging # rituals. May impart a forbidden # skill.",
		descriptionIcons: [IconPhylactery, IconRituals, IconSkills],
		Icon: IconOccultist,
		interaction: "See",
		monologues: {
			1: "Prepared to transcend your limits?",
			[FINALITY_STAGE["res dominus"]]: `The world ends at ${LEVELLING_MAXIMUM}.`,
			[LEVELLING_END]: MONOLOGUE_EMPTY,
			[LEVELLING_MAXIMUM]: "I can't see any more.",
		},
		price: 750,
		requiredStage: 30,
	},
	tailor: {
		description: "Alleviates # encumbrance by expanding the # knapsack.",
		descriptionIcons: [IconEncumbrance, IconKnapsack],
		Icon: IconTailor,
		interaction: "Stitch",
		monologues: {
			1: "Always leave some extra space for unexpected finds.",
			[LEVELLING_END]: MONOLOGUE_EMPTY,
			[LEVELLING_MAXIMUM]: "Fate has been mis-weaved.",
		},
		price: 35,
		requiredStage: 8,
	},
	witch: {
		description: "Sells # potions that restore reserves and cure ailments. May impart a mystical # skill.",
		descriptionIcons: [IconPotions, IconSkills],
		Icon: IconWitch,
		interaction: "Brew",
		monologues: {
			1: "Gaze into my cauldron ...",
			[FINALITY_STAGE["res dominus"]]: "The oval spawn has the answers you seek.",
			[LEVELLING_END]: MONOLOGUE_EMPTY,
			[LEVELLING_MAXIMUM]: "The cipher has gone silent.",
		},
		price: 300,
		requiredStage: 21,
	},
}

export const MERCHANT_OFFERS: Record<
	number,
	{
		monologue?: string
		offer: InheritableItem
		| (ArtifactType<"armor"> & { gearClass: ArmorClass })
		| (ArtifactType<"shield"> & { gearClass: ShieldClass })
		| (ArtifactType<"weapon"> & {
			gearClass: WeaponClass
			grip: Grip
			modality: WeaponModality
		})
	}
> = {
	1: {
		monologue: "Greetings. I have what you're looking for.",
		offer: { gearClass: "piercing", grip: "one-handed", modality: "melee", type: "weapon" },
	},
	2: {
		monologue: "Hello again. Some protection, perhaps?",
		offer: { gearClass: "light", type: "armor" },
	},
	3: {
		monologue: "Ah, you're back. Care for something to fend off attacks?",
		offer: { gearClass: "small", type: "shield" },
	},
	4: {
		monologue: "Need a way to manage your possessions?",
		offer: RELICS.knapsack.item,
	},
	6: {
		monologue: "New gear for sale, if you care to peruse.",
		offer: { gearClass: "slashing", grip: "one-handed", modality: "melee", type: "weapon" },
	},
	7: {
		offer: { gearClass: "reinforced", type: "armor" },
	},
	8: {
		monologue: "I've happened upon a relic allowing you to retread old ground.",
		offer: RELICS.compass.item,
	},
	9: {
		offer: { gearClass: "medium", type: "shield" },
	},
	10: {
		offer: { gearClass: "blunt", grip: "one-handed", modality: "melee", type: "weapon" },
	},
	11: {
		monologue: "Fine craftsmanship in this little gadget ...",
		offer: RELICS["thaumaturgic goggles"].item,
	},
	14: {
		monologue: "A relic that grants safe passage. Would that be of interest?",
		offer: RELICS.hearthstone.item,
	},
	[CREW.fletcher.requiredStage]: {
		monologue: "Here is something suitable for marksmen.",
		offer: RELICS["munitions satchel"].item,
	},
	25: {
		monologue: "I recently came into possession of a fine curiosity.",
		offer: RELICS["ender hook"].item,
	},
	30: { monologue: "You wouldn't be a scribe, would you?", offer: RELICS.journal.item },
	36: {
		monologue: "Here's an intriguing device that should ease up the grind.",
		offer: RELICS.automincer.item,
	},
	40: {
		monologue: "A dark wanderer passed through and sold me a strange book.",
		offer: INFUSABLES["eldritch codex"].item,
	},
	[POISON.requiredStage]: {
		monologue: "Allow me to offer a phial to collect your sorrows.",
		offer: RELICS.lacrimatory.item,
	},
	50: {
		monologue: "Now, release your anger.",
		offer: RELICS["war mask"].item,
	},
}

export const PURGE_PRICE_MULTIPLIER = {
	essence: 0.1,
	quests: 100,
}

export const SURGERY_PRICE = {
	// Price of individually purchasing bandages and elixir with a 10% surcharge.
	maximum: Math.round((CONSUMABLES.bandages.item.price + CONSUMABLES.elixir.item.price) * 1.1),
	minimum: 5,
}

export const TAILORING = { amount: 3, priceRange: { maximum: 250, minimum: 3 } }

export const TRANSMUTATION = {
	gemCost: 3,
	gemYield: 1,
	price: 100,
}

export const WITCH_POTIONS: { consumable: Consumable, requiredStage: number }[] = [
	{ consumable: "elixir", requiredStage: 1 },
	{ consumable: "antidote", requiredStage: POISON.requiredStage },
	{ consumable: "salve", requiredStage: BLIGHT.requiredStage },
]

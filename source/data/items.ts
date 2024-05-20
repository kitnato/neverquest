import { FRAMERATE, LEVELLING_MAXIMUM } from "@neverquest/data/general"
import IconAlchemist from "@neverquest/icons/alchemist.svg?react"
import IconAmethyst from "@neverquest/icons/amethyst.svg?react"
import IconAntidote from "@neverquest/icons/antidote.svg?react"
import IconAttackRate from "@neverquest/icons/attack-rate.svg?react"
import IconAttack from "@neverquest/icons/attack.svg?react"
import IconAutomincer from "@neverquest/icons/automincer.svg?react"
import IconBandages from "@neverquest/icons/bandages.svg?react"
import IconBlighted from "@neverquest/icons/blighted.svg?react"
import IconCaravan from "@neverquest/icons/caravan.svg?react"
import IconCompass from "@neverquest/icons/compass.svg?react"
import IconDamagePerSecond from "@neverquest/icons/damage-per-second.svg?react"
import IconDamage from "@neverquest/icons/damage.svg?react"
import IconDreamCatcher from "@neverquest/icons/dream-catcher.svg?react"
import IconEldritchCodex from "@neverquest/icons/eldritch-codex.svg?react"
import IconElixir from "@neverquest/icons/elixir.svg?react"
import IconEnderHook from "@neverquest/icons/ender-hook.svg?react"
import IconFamiliar from "@neverquest/icons/familiar.svg?react"
import IconFire from "@neverquest/icons/fire.svg?react"
import IconFlatlined from "@neverquest/icons/flatlined.svg?react"
import IconGear from "@neverquest/icons/gear.svg?react"
import IconGrinding from "@neverquest/icons/grinding.svg?react"
import IconHatchingProgress from "@neverquest/icons/hatching-progress.svg?react"
import IconHealth from "@neverquest/icons/health.svg?react"
import IconStone from "@neverquest/icons/hearthstone.svg?react"
import IconIce from "@neverquest/icons/ice.svg?react"
import IconJournal from "@neverquest/icons/journal.svg?react"
import IconKnapsack from "@neverquest/icons/knapsack.svg?react"
import IconLacrimatory from "@neverquest/icons/lacrimatory.svg?react"
import IconLifeLeech from "@neverquest/icons/life-leech.svg?react"
import IconLightning from "@neverquest/icons/lightning.svg?react"
import IconLogEntry from "@neverquest/icons/log-entry.svg?react"
import IconLoot from "@neverquest/icons/loot.svg?react"
import IconLooting from "@neverquest/icons/looting.svg?react"
import IconMemento from "@neverquest/icons/memento.svg?react"
import IconMonsterLurking from "@neverquest/icons/monster-lurking.svg?react"
import IconMunitionsSatchel from "@neverquest/icons/munitions-satchel.svg?react"
import IconMunitions from "@neverquest/icons/munitions.svg?react"
import IconMysteriousEgg from "@neverquest/icons/mysterious-egg.svg?react"
import IconNavigation from "@neverquest/icons/navigation.svg?react"
import IconPhylactery from "@neverquest/icons/phylactery.svg?react"
import IconPoisonRating from "@neverquest/icons/poison-rating.svg?react"
import IconPoisoned from "@neverquest/icons/poisoned.svg?react"
import IconProtected from "@neverquest/icons/protected.svg?react"
import IconQuests from "@neverquest/icons/quests.svg?react"
import IconRage from "@neverquest/icons/rage.svg?react"
import IconRanged from "@neverquest/icons/ranged.svg?react"
import IconRetreat from "@neverquest/icons/retreat.svg?react"
import IconRuby from "@neverquest/icons/ruby.svg?react"
import IconSalve from "@neverquest/icons/salve.svg?react"
import IconSapphire from "@neverquest/icons/sapphire.svg?react"
import IconStage from "@neverquest/icons/stage.svg?react"
import IconStamina from "@neverquest/icons/stamina.svg?react"
import IconTears from "@neverquest/icons/tears.svg?react"
import IconThaumaturgicGoggles from "@neverquest/icons/thaumaturgic-goggles.svg?react"
import IconTornManuscript from "@neverquest/icons/torn-manuscript.svg?react"
import IconWarMask from "@neverquest/icons/war-mask.svg?react"
import IconWilderness from "@neverquest/icons/wilderness.svg?react"

import type { ConsumableItem, GeneratorRange, InfusableItem, RelicItem } from "@neverquest/types"
import type { SVGIcon } from "@neverquest/types/components"
import type { Description } from "@neverquest/types/ui"
import type {
	Consumable,
	Delta,
	Elemental,
	ElementalAilment,
	Extent,
	Gem,
	Infusable,
	Relic,
} from "@neverquest/types/unions"

export const CONSUMABLES: Record<
	Consumable,
	Description & { Icon: SVGIcon, item: ConsumableItem }
> = {
	antidote: {
		description: "Cures # poison.",
		descriptionIcons: [IconPoisoned],
		Icon: IconAntidote,
		item: {
			ID: "",
			name: "antidote",
			price: 150,
			weight: 5,
		},
	},
	bandages: {
		description: "Fully restores # health.",
		descriptionIcons: [IconHealth],
		Icon: IconBandages,
		item: {
			ID: "",
			name: "bandages",
			price: 35,
			weight: 1,
		},
	},
	elixir: {
		description: "Fully restores # stamina.",
		descriptionIcons: [IconStamina],
		Icon: IconElixir,
		item: {
			ID: "",
			name: "elixir",
			price: 50,
			weight: 2,
		},
	},
	phylactery: {
		description: "Resurrects the bearer upon # death.",
		descriptionIcons: [IconFlatlined],
		Icon: IconPhylactery,
		item: {
			ID: "",
			name: "phylactery",
			price: 375,
			weight: 10,
		},
	},
	salve: {
		description: "Cures # blight.",
		descriptionIcons: [IconBlighted],
		Icon: IconSalve,
		item: {
			ID: "",
			name: "salve",
			price: 250,
			weight: 3,
		},
	},
}

export const ELEMENTALS: Record<
	Elemental,
	{
		ailment: ElementalAilment
		color: string
		damageArmor: GeneratorRange
		damageWeapon: GeneratorRange
		duration: GeneratorRange
		durationCap: number
		extent: Extent
		gem: Gem
		Icon: SVGIcon
	}
> = {
	fire: {
		ailment: "burning",
		color: "orange",
		damageArmor: { maximum: 1.75, minimum: 0.75 },
		damageWeapon: { maximum: 0.4, minimum: 0.1 },
		duration: { maximum: 2500, minimum: 1200 },
		durationCap: 7500,
		extent: "high",
		gem: "ruby",
		Icon: IconFire,
	},
	ice: {
		ailment: "frozen",
		color: "cyan",
		damageArmor: { maximum: 1.5, minimum: 0.5 },
		damageWeapon: { maximum: 0.3, minimum: 0.075 },
		duration: { maximum: 2200, minimum: 1000 },
		durationCap: 3500,
		extent: "medium",
		gem: "sapphire",
		Icon: IconIce,
	},
	lightning: {
		ailment: "shocked",
		color: "purple",
		damageArmor: { maximum: 1.25, minimum: 0.25 },
		damageWeapon: { maximum: 0.2, minimum: 0.05 },
		duration: { maximum: 2000, minimum: 900 },
		durationCap: 5000,
		extent: "low",
		gem: "amethyst",
		Icon: IconLightning,
	},
}

export const ENCUMBRANCE_CAPACITY = 6

export const GEM_BASE = {
	price: 250,
	weight: 1,
}
export const GEM_ENHANCEMENT_RANGE = {
	maximum: 0.5,
	minimum: 0.1,
}
export const GEM_FITTING_COST_RANGE = {
	maximum: 300,
	minimum: 10,
}
export const GEMS_MAXIMUM = 5
export const GEMS: Record<Gem, { elemental: Elemental, Icon: SVGIcon }> = {
	amethyst: { elemental: "lightning", Icon: IconAmethyst },
	ruby: { elemental: "fire", Icon: IconRuby },
	sapphire: { elemental: "ice", Icon: IconSapphire },
}

export const INFUSION_BASE = 2

export const INFUSION_DELTA = FRAMERATE * 2
export const INFUSION_DURATION = 1000

export const INFUSABLES: Record<
	Infusable,
	Description & {
		delta: Delta
		EffectIcon: SVGIcon
		Icon: SVGIcon
		item: InfusableItem
		tooltip: string
	}
> = {
	"eldritch codex": {
		delta: "lifeLeech",
		description: "# Attacks return a fraction of # total damage as # health.",
		descriptionIcons: [IconAttackRate, IconDamage, IconHealth],
		EffectIcon: IconLifeLeech,
		Icon: IconEldritchCodex,
		item: {
			effect: {
				maximum: 0.25,
				minimum: 0.01,
			},
			ID: "",
			name: "eldritch codex",
			price: 3666,
			weight: 13,
		},
		tooltip: "Life leech",
	},
	"mysterious egg": {
		delta: "hatchingProgress",
		description: "A perplexing ovum emanating otherworldly energy.",
		EffectIcon: IconHatchingProgress,
		Icon: IconMysteriousEgg,
		item: {
			effect: { maximum: 1, minimum: 0 },
			ID: "",
			name: "mysterious egg",
			price: 1554,
			weight: 7,
		},
		tooltip: "Hatching progress",
	},
}

export const KNAPSACK_CAPACITY = 16

export const MUNITIONS = {
	amount: 1,
	maximum: LEVELLING_MAXIMUM,
	priceRange: { maximum: 750, minimum: 3 },
	satchelCapacity: 5,
}

export const RELIC_DROP_CHANCE = {
	"dream catcher": { maximum: 0.03, minimum: 0.01 },
	"memento": { maximum: 0.08, minimum: 0.01 },
	"torn manuscript": { maximum: 0.05, minimum: 0.01 },
}

export const RELICS: Record<
	Relic,
	Description & {
		Icon: SVGIcon
		item: RelicItem
	}
> = {
	"[S751NQ]": {
		description: "",
		Icon: IconLogEntry,
		item: {
			ID: "",
			name: "[S751NQ]",
			price: 140_014,
			weight: 14,
		},
	},
	"automincer": {
		description:
			"While # equipped, collects # loot and passes to the next # stage once clear of monsters.",
		descriptionIcons: [IconGrinding, IconLoot, IconStage],
		Icon: IconAutomincer,
		item: {
			ID: "",
			name: "automincer",
			price: 4000,
			weight: 20,
		},
	},
	"compass": {
		description: "Allows # navigation of the # wilderness to explore previous locations.",
		descriptionIcons: [IconNavigation, IconWilderness],
		Icon: IconCompass,
		item: {
			ID: "",
			name: "compass",
			price: 50,
			weight: 3,
		},
	},
	"dream catcher": {
		description: "While # equipped and # attacking, consumes # bandages if at low # health or an # elixir if # exhausted, otherwise # retreats.",
		descriptionIcons: [IconProtected, IconAttack, IconBandages, IconHealth, IconElixir, IconStamina, IconRetreat],
		Icon: IconDreamCatcher,
		item: {
			ID: "",
			name: "dream catcher",
			price: 1500,
			weight: 10,
		},
	},
	"ender hook": {
		description: "Monsters are # looted immediately.",
		descriptionIcons: [IconLooting],
		Icon: IconEnderHook,
		item: {
			ID: "",
			name: "ender hook",
			price: 2500,
			weight: 15,
		},
	},
	"familiar": {
		description: "Compels the manifestation of the final entity.",
		Icon: IconFamiliar,
		item: {
			ID: "",
			name: "familiar",
			price: 1,
			weight: 75,
		},
	},
	"hearthstone": {
		description: "Instantly travel back to the # caravan regardless of any # lurking monsters.",
		descriptionIcons: [IconCaravan, IconMonsterLurking],
		Icon: IconStone,
		item: {
			ID: "",
			name: "hearthstone",
			price: 100,
			weight: 5,
		},
	},
	"journal": {
		description: "A compendium of # quests.",
		descriptionIcons: [IconQuests],
		Icon: IconJournal,
		item: {
			ID: "",
			name: "journal",
			price: 750,
			weight: 8,
		},
	},
	"knapsack": {
		description: "Provides space for items and the ability to manage # gear.",
		descriptionIcons: [IconGear],
		Icon: IconKnapsack,
		item: {
			ID: "",
			name: "knapsack",
			price: 15,
			weight: 0,
		},
	},
	"lacrimatory": {
		description: "Collects # tears from # noxious foes.",
		descriptionIcons: [IconTears, IconPoisonRating],
		Icon: IconLacrimatory,
		item: {
			ID: "",
			name: "lacrimatory",
			price: 1500,
			weight: 10,
		},
	},
	"memento": {
		description: "Lost memories held close unlock pathways to remarkable discoveries ...",
		Icon: IconMemento,
		item: {
			ID: "",
			name: "memento",
			price: 150,
			weight: 2,
		},
	},
	"munitions satchel": {
		description: "Stores # munitions to fire # ranged weapons.",
		descriptionIcons: [IconMunitions, IconRanged],
		Icon: IconMunitionsSatchel,
		item: {
			ID: "",
			name: "munitions satchel",
			price: 300,
			weight: 15,
		},
	},
	"thaumaturgic goggles": {
		description: "Discerns # damage per second of all creatures.",
		descriptionIcons: [IconDamagePerSecond],
		Icon: IconThaumaturgicGoggles,
		item: {
			ID: "",
			name: "thaumaturgic goggles",
			price: 250,
			weight: 4,
		},
	},
	"torn manuscript": {
		description: "Describes # theurgical methodologies beyond comprehension.",
		descriptionIcons: [IconAlchemist],
		Icon: IconTornManuscript,
		item: {
			ID: "",
			name: "torn manuscript",
			price: 500,
			weight: 3,
		},
	},
	"war mask": {
		description: "All who glimpse it are # enraged. Why though?",
		descriptionIcons: [IconRage],
		Icon: IconWarMask,
		item: {
			ID: "",
			name: "war mask",
			price: 3500,
			weight: 7,
		},
	},
}

export const TEARS_MAXIMUM = 21

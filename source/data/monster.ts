import { LEVELLING_MAXIMUM } from "@neverquest/data/general"
import { AILMENT_PENALTY } from "@neverquest/data/statistics"
import IconDamage from "@neverquest/icons/damage.svg?react"
import IconMonsterAttackRate from "@neverquest/icons/monster-attack-rate.svg?react"
import IconMonsterDamage from "@neverquest/icons/monster-damage.svg?react"
import IconMonsterHealth from "@neverquest/icons/monster-health.svg?react"
import { formatNumber } from "@neverquest/utilities/formatters"

import { RETIREMENT_STAGE } from "./retirement"

import type { Description } from "@neverquest/types/ui"
import type { Ailment } from "@neverquest/types/unions"

export const AILMENT_DESCRIPTION: Record<Ailment, Description> = {
	bleeding: { description: "Suffering periodic damage." },
	burning: { description: "Cannot regenerate # health.", descriptionIcons: [IconMonsterHealth] },
	frozen: {
		description: `Attack # rate slowed by ${formatNumber({
			format: "percentage",
			value: AILMENT_PENALTY.frozen,
		})}.`,
		descriptionIcons: [IconMonsterAttackRate],
	},
	shocked: {
		description: `Taking ${formatNumber({
			format: "percentage",
			value: AILMENT_PENALTY.shocked,
		})} increased # damage.`,
		descriptionIcons: [IconDamage],
	},
	staggered: {
		description: `Dealing ${formatNumber({
			format: "percentage",
			value: AILMENT_PENALTY.staggered,
		})} decreased # damage.`,
		descriptionIcons: [IconMonsterDamage],
	},
	stunned: {
		description: `Chance to hit on # attack reduced to ${formatNumber({
			format: "percentage",
			value: AILMENT_PENALTY.stunned,
		})}.`,
		descriptionIcons: [IconMonsterAttackRate],
	},
}

export const BOSS_STAGE_INTERVAL = 5
export const BOSS_STAGE_START = 10

export const BLIGHT = {
	chance: {
		maximum: 0.25,
		minimum: 0.05,
	},
	finality: {
		"res cogitans": 0.5757,
		"res dominus": 0.1717,
	},
	increment: 0.025,
	requiredStage: 50,
}

export const ESSENCE = {
	attenuation: 3.5,
	base: 6,
	bossModifier: 1,
	finality: {
		"res cogitans": 77777,
		"res dominus": 7777,
	},
	progressModifier: -0.03,
}

export const FINALITY_STAGE = {
	"res cogitans": LEVELLING_MAXIMUM,
	"res dominus": 57,
}

export const FRAILTY = {
	"familiar": -0.2,
	"mysterious egg": {
		maximum: -0.15,
		minimum: -0.01,
	},
}

export const GEM_DROP_MAXIMUM = 5

export const LOOT_MODIFIER = {
	equalStage: 1,
	lowerStageEssence: 0.35,
	lowerStageGems: 0.2,
}

export const MONSTER_ATTACK_RATE = {
	attenuation: 4800,
	finality: {
		"res cogitans": 1750,
		"res dominus": 2750,
	},
	maximum: 4100,
	minimum: 2200,
}

export const MONSTER_DAMAGE = {
	attenuation: 3.5,
	base: 5,
	bossModifier: 0.05,
	finality: {
		"res cogitans": 1575,
		"res dominus": 1075,
	},
	menace: {
		maximum: 0.8,
		minimum: 0.6,
		requiredStage: RETIREMENT_STAGE + 1,
	},
	progressModifier: 0.01,
}

export const MONSTER_HEALTH = {
	attenuation: 2,
	base: 18,
	bossModifier: 0.75,
	finality: {
		"res cogitans": 7575,
		"res dominus": 3757,
	},
	menace: {
		maximum: 3.5,
		minimum: 1.4,
		requiredStage: RETIREMENT_STAGE + 1,
	},
	progressModifier: 0.02,
}

export const MONSTER_REGENERATION = {
	duration: 40_000,
	minimum: 1,
	ticks: 20,
}

export const POISON = {
	chance: {
		maximum: 0.3,
		minimum: 0.1,
	},
	duration: {
		maximum: 350_000,
		minimum: 30_000,
	},
	finality: {
		"res cogitans": 0.7575,
		"res dominus": 0.5757,
	},
	magnitude: {
		maximum: 0.2,
		minimum: 0.075,
	},
	requiredStage: 45,
}

export const RAGE = {
	effect: 0.5,
	increment: 1,
	maximum: 4,
	requiredStage: 21,
}

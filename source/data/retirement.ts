import { type Perk, TRAIT_TYPES } from "@neverquest/types/unions"

import type { GeneratorRange } from "@neverquest/types"

export const PERKS: Record<Perk, GeneratorRange & { generationMaximum: number }> = {
	essenceBonus: {
		generationMaximum: 5,
		maximum: 1,
		minimum: 0.2,
	},
	monsterReduction: {
		generationMaximum: 5,
		maximum: 0.8,
		minimum: 0.35,
	},
	startingEssence: {
		generationMaximum: TRAIT_TYPES.length,
		maximum: 0.2,
		minimum: 0.03,
	},
}

export const RETIREMENT_STAGE = 35

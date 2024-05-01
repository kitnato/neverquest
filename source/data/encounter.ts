import type { AffixStructure } from "@kitnato/locran/build/types"

export const AFFIX_STRUCTURE_WEIGHTS: [AffixStructure, number][] = [
	["noAffix", 0.025],
	["prefixAndSuffix", 0.075],
	["suffix", 0.25],
	["prefix", 0.65],
]

export const CORPSE_VALUE = 0.3

export const DEATH_STAGE_PENALTY = 3

export const PROGRESS = {
	maximum: 20,
	minimum: 3,
}

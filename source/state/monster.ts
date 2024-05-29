import { nanoid } from "nanoid"
import { atom, atomFamily, selector, selectorFamily } from "recoil"

import { PROGRESS } from "@neverquest/data/character"
import { GENERIC_MINIMUM, LEVELLING_MAXIMUM } from "@neverquest/data/general"
import { INFUSABLES, RELICS, RELIC_DROP_CHANCE } from "@neverquest/data/items"
import {
	BLIGHT,
	BOSS_STAGE_INTERVAL,
	BOSS_STAGE_START,
	ESSENCE,
	FRAILTY,
	GEM_DROP_MAXIMUM,
	LOOT_MODIFIER,
	MONSTER_ATTACK_RATE,
	MONSTER_DAMAGE,
	MONSTER_HEALTH,
	POISON,
	RAGE,
} from "@neverquest/data/monster"
import { AILMENT_PENALTY } from "@neverquest/data/statistics"
import { bleed } from "@neverquest/state/ailments"
import { isHired } from "@neverquest/state/caravan"
import {
	encounter,
	isStageStarted,
	perkEffect,
	progress,
	stage,
	stageHighest,
} from "@neverquest/state/character"
import { handleStorage } from "@neverquest/state/effects/handleStorage"
import { ownedItem } from "@neverquest/state/inventory"
import { infusionEffect, isInheritableLooted, isRelicEquipped } from "@neverquest/state/items"
import { isSkillTrained } from "@neverquest/state/skills"
import { range } from "@neverquest/state/statistics"
import { isFinality } from "@neverquest/types/type-guards"
import { formatNumber } from "@neverquest/utilities/formatters"
import {
	getDamagePerRate,
	getFromRange,
	getLinearMapping,
	getSigmoid,
	getTriangular,
} from "@neverquest/utilities/getters"
import { withStateKey } from "@neverquest/utilities/helpers"

import type { Ailment } from "@neverquest/types/unions"

// SELECTORS

const bleedingDeltaLength = withStateKey("bleedingDeltaLength", key =>
	selector({
		get: ({ get }) => {
			const { duration, ticks } = get(bleed)

			return Math.round(duration / ticks)
		},
		key,
	}),
)

export const blightChance = withStateKey("blightChance", key =>
	selector({
		get: ({ get }) => {
			const encounterValue = get(encounter)
			const stageValue = get(stage)

			const {
				chance: { maximum, minimum },
				finality,
				requiredStage,
			} = BLIGHT

			if (stageValue < requiredStage) {
				return 0
			}

			if (isFinality(encounterValue)) {
				return finality[encounterValue]
			}

			return (
				getFromRange({
					factor: getSigmoid(getLinearMapping({ offset: requiredStage, stage: stageValue })),
					maximum,
					minimum,
				})
			)
		},
		key,
	}),
)

export const frailty = withStateKey("frailty", key =>
	selector({
		get: ({ get }) => {
			if (isFinality(get(encounter))) {
				return 0
			}

			if (get(ownedItem("familiar")) !== undefined) {
				return FRAILTY.familiar
			}

			if (get(ownedItem("mysterious egg")) !== undefined) {
				return getFromRange({
					factor: getSigmoid(get(infusionEffect("mysterious egg")) * LEVELLING_MAXIMUM),
					...FRAILTY["mysterious egg"],
				})
			}

			return 0
		},
		key,
	}),
)

export const isEnraged = withStateKey("isEnraged", key =>
	selector({
		get: ({ get }) => get(isRelicEquipped("war mask")) || get(rage) === RAGE.maximum,
		key,
	}),
)

export const isMonsterAiling = withStateKey("isMonsterAiling", key =>
	selectorFamily({
		get:
			(ailment: Ailment) =>
				({ get }) =>
					get(monsterAilmentDuration(ailment)) > 0,
		key,
	}),
)

export const isMonsterAtFullHealth = withStateKey("isMonsterAtFullHealth", key =>
	selector({
		get: ({ get }) => get(monsterHealth) === get(monsterHealthMaximum),
		key,
	}),
)

export const isMonsterClose = withStateKey("isMonsterClose", key =>
	selector({
		get: ({ get }) => get(distance) === 0,
		key,
	}),
)

export const isMonsterDead = withStateKey("isMonsterDead", key =>
	selector({
		get: ({ get }) => get(isStageStarted) && get(monsterHealth) === 0,
		key,
	}),
)

export const isMonsterRegenerating = withStateKey("isMonsterRegenerating", key =>
	selector({
		get: ({ get }) => get(monsterRegenerationDuration) > 0,
		key,
	}),
)

export const monsterAttackRate = withStateKey("monsterAttackRate", key =>
	selector({
		get: ({ get }) => {
			const { attenuation, finality, maximum, minimum } = MONSTER_ATTACK_RATE
			const encounterValue = get(encounter)

			if (isFinality(encounterValue)) {
				return finality[encounterValue]
			}

			return Math.round(
				Math.max(
					maximum - maximum * (getTriangular(get(stage)) / attenuation),
					minimum,
				) * (get(isEnraged) ? RAGE.effect : 1),
			)
		},
		key,
	}),
)

export const monsterDamage = withStateKey("monsterDamage", key =>
	selector({
		get: ({ get }) => {
			const {
				attenuation,
				base,
				bossModifier,
				finality,
				menace: { maximum, minimum, requiredStage },
				progressModifier,
			} = MONSTER_DAMAGE
			const encounterValue = get(encounter)
			const stageValue = get(stage)

			if (isFinality(encounterValue)) {
				return finality[encounterValue]
			}

			return Math.round((base + getTriangular(stageValue) / attenuation) * (
				1
				+ Math.min(get(progress), PROGRESS.maximum) * progressModifier
				+ (encounterValue === "boss" ? bossModifier : 0)
				+ (
					stageValue >= requiredStage
						? getFromRange({
							factor: getSigmoid(
								getLinearMapping({ offset: requiredStage, stage: stageValue }),
							),
							maximum,
							minimum,
						})
						: 0
				)
			) * (1 + get(frailty)))
		},
		key,
	}),
)

export const monsterDamageAiling = withStateKey("monsterDamageAiling", key =>
	selector({
		get: ({ get }) => Math.round(
			get(monsterDamage)
			* (get(isMonsterAiling("staggered")) ? 1 - AILMENT_PENALTY.staggered : 1),
		),
		key,
	}),
)

export const monsterDamageAilingPerSecond = withStateKey("monsterDamageAilingPerSecond", key =>
	selector({
		get: ({ get }) => {
			const { frozen, stunned } = AILMENT_PENALTY

			return formatNumber({
				format: "float",
				value: getDamagePerRate({
					damage: get(monsterDamageAiling),
					damageModifier: 0,
					damageModifierChance: get(isMonsterAiling("stunned")) ? stunned : undefined,
					rate: get(monsterAttackRate),
					rateModifier: get(isMonsterAiling("frozen")) ? frozen : undefined,
				}),
			})
		},
		key,
	}),
)

export const monsterHealthMaximum = withStateKey("monsterHealthMaximum", key =>
	selector({
		get: ({ get }) => {
			const {
				attenuation,
				base,
				bossModifier,
				finality,
				menace: { maximum, minimum, requiredStage },
				progressModifier,
			} = MONSTER_HEALTH
			const encounterValue = get(encounter)
			const stageValue = get(stage)

			if (isFinality(encounterValue)) {
				return finality[encounterValue]
			}

			return Math.round((base + getTriangular(stageValue) / attenuation) * (
				1
				+ Math.min(get(progress), PROGRESS.maximum) * progressModifier
				+ (encounterValue === "boss" ? bossModifier : 0)
				+ (
					stageValue >= requiredStage
						? getFromRange({
							factor: getSigmoid(
								getLinearMapping({ offset: requiredStage, stage: stageValue }),
							),
							maximum,
							minimum,
						})
						: 0
				)
			) * (1 + get(frailty)))
		},
		key,
	}),
)

export const monsterLoot = withStateKey("monsterLoot", key =>
	selector({
		get: ({ get }) => {
			const { attenuation, base, bossModifier, finality, progressModifier } = ESSENCE
			const { equalStage, lowerStageEssence, lowerStageGems } = LOOT_MODIFIER

			const encounterValue = get(encounter)
			const isMementoOwned = get(ownedItem("memento")) !== undefined
			const stageValue = get(stage)
			const stageHighestValue = get(stageHighest)

			return {
				essence: Math.max(
					isFinality(encounterValue)
						? finality[encounterValue]
						: Math.round((base + getTriangular(stageValue) / attenuation) * (
							1
							+ get(progress) * progressModifier
							+ (encounterValue === "boss" ? bossModifier : 0)
							+ get(perkEffect("essenceBonus"))
						) * (stageValue < stageHighestValue ? lowerStageEssence : equalStage)),
					GENERIC_MINIMUM,
				),
				gems: encounterValue === "boss"
					? Math.min(
						Array.from<undefined>({
							length: 1 + Math.floor((stageValue - BOSS_STAGE_START) / BOSS_STAGE_INTERVAL),
						}).reduce<number>(
							(sum, _) =>
								Math.random() <= (stageValue < stageHighestValue ? lowerStageGems : equalStage)
									? sum + 1
									: sum,
							0,
						),
						GEM_DROP_MAXIMUM)
					: 0,
				relic: encounterValue === "boss" || get(ownedItem("knapsack")) === undefined
					? undefined
					: encounterValue === "res dominus" && isMementoOwned && !get(isInheritableLooted("mysterious egg")) && !get(isInheritableLooted("familiar"))
						// Mysterious egg only drops after defeating Res Dominus while carrying the Memento and if the egg nor the familiar have ever been looted.
						? { ...INFUSABLES["mysterious egg"].item, ID: nanoid() }
						// Log Entry only drops after defeating Res Dominus while carrying the Memento and if it's never been looted before.
						: encounterValue === "res dominus" && isMementoOwned && !get(isInheritableLooted("[S751NQ]"))
							? { ...RELICS["[S751NQ]"].item, ID: nanoid() }
							: isMementoOwned && !get(isInheritableLooted("torn manuscript")) && get(isHired("alchemist")) && !get(isSkillTrained("memetics")) && Math.random() <= getFromRange({ factor: getSigmoid(stageValue), ...RELIC_DROP_CHANCE["torn manuscript"] })
								// Torn manuscript drops if it's never been looted before, if the memento is carried, if the correct crew member is hired, if the associated skill hasn't been trained and if the drop chance is reached.
								? { ...RELICS["torn manuscript"].item, ID: nanoid() }
								: isMementoOwned && !get(isInheritableLooted("dream catcher")) && get(isHired("occultist")) && !get(isSkillTrained("meditation")) && Math.random() <= getFromRange({ factor: getSigmoid(stageValue), ...RELIC_DROP_CHANCE["dream catcher"] })
									// Dream catcher drops if it's never been looted before, if the memento is carried, if the correct crew member is hired, if the associated skill hasn't been trained and if the drop chance is reached.
									? { ...RELICS["dream catcher"].item, ID: nanoid() }
									: !get(isInheritableLooted("memento")) && Math.random() <= getFromRange({ factor: getSigmoid(stageValue), ...RELIC_DROP_CHANCE.memento })
										// Memento drops if it's never been looted before and if the drop chance is reached.
										? { ...RELICS.memento.item, ID: nanoid() }
										: undefined,
			}
		},
		key,
	}),
)

export const poisonChance = withStateKey("poisonChance", key =>
	selector({
		get: ({ get }) => {
			const encounterValue = get(encounter)
			const stageValue = get(stage)

			const {
				chance: { maximum, minimum },
				finality,
				requiredStage,
			} = POISON

			if (stageValue < requiredStage) {
				return 0
			}

			if (isFinality(encounterValue)) {
				return finality[encounterValue]
			}

			return (
				getFromRange({
					factor: getSigmoid(getLinearMapping({ offset: requiredStage, stage: stageValue })),
					maximum,
					minimum,
				})
			)
		},
		key,
	}),
)

// ATOMS

export const bleedingDelta = withStateKey("bleedingDelta", key =>
	atom({
		default: bleedingDeltaLength,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const distance = withStateKey("distance", key =>
	atom({
		default: range,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const isMonsterNew = withStateKey("isMonsterNew", key =>
	atom({
		default: true,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const monsterAilmentDuration = withStateKey("monsterAilmentDuration", key =>
	atomFamily<number, Ailment>({
		default: 0,
		effects: ailment => [handleStorage({ key, parameter: ailment })],
		key,
	}),
)

export const monsterAttackDuration = withStateKey("monsterAttackDuration", key =>
	atom({
		default: 0,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const monsterElement = withStateKey("monsterElement", key =>
	atom<HTMLDivElement | null>({
		default: null,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const monsterHealth = withStateKey("monsterHealth", key =>
	atom({
		default: monsterHealthMaximum,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const monsterName = withStateKey("monsterName", key =>
	atom<string | undefined>({
		default: undefined,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const monsterRegenerationDuration = withStateKey("monsterRegenerationDuration", key =>
	atom({
		default: 0,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const rage = withStateKey("rage", key =>
	atom({
		default: 0,
		effects: [handleStorage({ key })],
		key,
	}),
)

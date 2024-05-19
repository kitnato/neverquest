import { nanoid } from "nanoid"
import { atom, atomFamily, selector, selectorFamily } from "recoil"

import { LOOT_MODIFIER, PROGRESS } from "@neverquest/data/encounter"
import { LEVELLING_MAXIMUM } from "@neverquest/data/general"
import { INFUSABLES, RELICS, RELIC_DROP_CHANCE } from "@neverquest/data/items"
import {
	BLIGHT,
	BOSS_STAGE_INTERVAL,
	BOSS_STAGE_START,
	ESSENCE,
	FRAILTY,
	MAXIMUM_GEM_DROP,
	MONSTER_ATTACK_RATE,
	MONSTER_DAMAGE,
	MONSTER_HEALTH,
	POISON,
	RAGE,
} from "@neverquest/data/monster"
import { AILMENT_PENALTY } from "@neverquest/data/statistics"
import { bleed } from "@neverquest/state/ailments"
import { isHired } from "@neverquest/state/caravan"
import { handleStorage } from "@neverquest/state/effects/handleStorage"
import {
	encounter,
	generation,
	isStageStarted,
	progress,
	stage,
	stageHighest,
} from "@neverquest/state/encounter"
import { ownedItem } from "@neverquest/state/inventory"
import { hasLootedInheritable, infusionEffect, isRelicEquipped } from "@neverquest/state/items"
import { isSkillAcquired } from "@neverquest/state/skills"
import { range } from "@neverquest/state/statistics"
import { isFinality } from "@neverquest/types/type-guards"
import { formatNumber } from "@neverquest/utilities/formatters"
import {
	getArmorRanges,
	getAttributePointCost,
	getDamagePerRate,
	getFromRange,
	getLinearMapping,
	getMeleeRanges,
	getPerkEffect,
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

export const hasMonsterClosed = withStateKey("hasMonsterClosed", key =>
	selector({
		get: ({ get }) => get(distance) === 0,
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

			[1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56, 61, 66, 71, 74].forEach((s) => {
				const l = getArmorRanges({
					factor: getSigmoid(s),
					gearClass: "light",
				}).protection
				const r = getArmorRanges({
					factor: getSigmoid(s),
					gearClass: "reinforced",
				}).protection
				const h = getArmorRanges({
					factor: getSigmoid(s),
					gearClass: "heavy",
				}).protection
				const bench = Math.round((r.maximum + r.minimum) / 2)
				const d = Math.round((base + getTriangular(s) / attenuation) * (
					1
					+ Math.min(get(progress), PROGRESS.maximum) * progressModifier
					+ (encounterValue === "boss" ? bossModifier : 0)
					+ (
						s >= requiredStage
							? getFromRange({
								factor: getSigmoid(
									getLinearMapping({ offset: requiredStage, stage: s }),
								),
								maximum,
								minimum,
							})
							: 0
					)
				))

				console.log(
					`stage${s} -`,
					"monster",
					d,
					"armor",
					Math.round((l.maximum + l.minimum) / 2),
					bench,
					Math.round((h.maximum + h.minimum) / 2),
					"diff",
					d - bench,
				)
			})

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

			[1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56, 61, 66, 71, 74].forEach((s) => {
				const w = getMeleeRanges({
					factor: getSigmoid(s),
					gearClass: "blunt",
					grip: "one-handed",
				}).damage
				const bench = Math.round((w.maximum + w.minimum) / 2)
				const h = Math.round((base + getTriangular(s) / attenuation) * (
					1
					+ Math.min(get(progress), PROGRESS.maximum) * progressModifier
					+ (encounterValue === "boss" ? bossModifier : 0)
					+ (
						s >= requiredStage
							? getFromRange({
								factor: getSigmoid(
									getLinearMapping({ offset: requiredStage, stage: s }),
								),
								maximum,
								minimum,
							})
							: 0
					)
				))

				console.log(
					`stage${s} -`,
					"monster",
					h,
					"weapon",
					bench,
					"diff",
					h / bench,
				)
			})

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
			const { equalStage, lowerStage } = LOOT_MODIFIER

			const encounterValue = get(encounter)
			const isMementoOwned = get(ownedItem("memento")) !== undefined
			const stageValue = get(stage)
			const stageHighestValue = get(stageHighest)
			const test = [1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56, 61, 66, 71, 74]

			test.forEach((s) => {
				console.log(
					`stage/level ${s} -`,
					"essence",
					Math.round((base + getTriangular(s) / attenuation) * (
						1
						+ Math.min(get(progress), PROGRESS.maximum) * progressModifier
						+ (encounterValue === "boss" ? bossModifier : 0)
						+ getPerkEffect({ generation: get(generation), perk: "essenceBonus" })
						+ (s < stageHighestValue ? lowerStage : equalStage)
					)),
					"cost",
					getAttributePointCost(s),
				)
			})

			return {
				essence: isFinality(encounterValue)
					? finality[encounterValue]
					: Math.round((base + getTriangular(stageValue) / attenuation) * (
						1
						+ Math.min(get(progress), PROGRESS.maximum) * progressModifier
						+ (encounterValue === "boss" ? bossModifier : 0)
						+ getPerkEffect({ generation: get(generation), perk: "essenceBonus" })
						+ (stageValue < stageHighestValue ? lowerStage : equalStage)
					)),
				gems: encounterValue === "boss"
					? Math.min(
						Array.from<undefined>({
							length: 1 + Math.floor((stageValue - BOSS_STAGE_START) / BOSS_STAGE_INTERVAL),
						}).reduce<number>(
							(sum, _) =>
								Math.random() <= 1 + (stageValue < stageHighestValue ? lowerStage : equalStage)
									? sum + 1
									: sum,
							0,
						),
						MAXIMUM_GEM_DROP)
					: 0,
				relic: encounterValue === "boss" || get(ownedItem("knapsack")) === undefined
					? undefined
					: encounterValue === "res dominus" && isMementoOwned && !get(hasLootedInheritable("mysterious egg")) && !get(hasLootedInheritable("familiar"))
						// Mysterious egg only drops after defeating Res Dominus while carrying the Memento and if the egg nor the familiar have ever been looted.
						? { ...INFUSABLES["mysterious egg"].item, ID: nanoid() }
						// Log Entry only drops after defeating Res Dominus while carrying the Memento and if it's never been looted before.
						: encounterValue === "res dominus" && isMementoOwned && !get(hasLootedInheritable("[S751NQ]"))
							? { ...RELICS["[S751NQ]"].item, ID: nanoid() }
							: isMementoOwned && !get(hasLootedInheritable("torn manuscript")) && get(isHired("alchemist")) && !get(isSkillAcquired("memetics")) && Math.random() <= getFromRange({ factor: getSigmoid(stageValue), ...RELIC_DROP_CHANCE["torn manuscript"] })
								// Torn manuscript drops if it's never been looted before, if the memento is carried, if the correct crew member is hired, if the associated skill hasn't been trained and if the drop chance is reached.
								? { ...RELICS["torn manuscript"].item, ID: nanoid() }
								: isMementoOwned && !get(hasLootedInheritable("dream catcher")) && get(isHired("occultist")) && !get(isSkillAcquired("meditation")) && Math.random() <= getFromRange({ factor: getSigmoid(stageValue), ...RELIC_DROP_CHANCE["dream catcher"] })
									// Dream catcher drops if it's never been looted before, if the memento is carried, if the correct crew member is hired, if the associated skill hasn't been trained and if the drop chance is reached.
									? { ...RELICS["dream catcher"].item, ID: nanoid() }
									: !get(hasLootedInheritable("memento")) && Math.random() <= getFromRange({ factor: getSigmoid(stageValue), ...RELIC_DROP_CHANCE.memento })
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

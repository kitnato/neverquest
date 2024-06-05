import { atom, atomFamily, selector, selectorFamily } from "recoil"

import { PROGRESS } from "@neverquest/data/character"
import { LABEL_UNKNOWN } from "@neverquest/data/general"
import { BOSS_STAGE_INTERVAL, BOSS_STAGE_START, FINALITY_STAGE } from "@neverquest/data/monster"
import { handleStorage } from "@neverquest/state/effects/handleStorage"
import { ownedItem } from "@neverquest/state/inventory"
import { essenceLoot } from "@neverquest/state/resources"
import { getFromRange, getPerkEffect, getSigmoid } from "@neverquest/utilities/getters"
import { withStateKey } from "@neverquest/utilities/helpers"

import type { Finality, Perk } from "@neverquest/types/unions"

// SELECTORS
export const canAwaken = withStateKey("canAwaken", key =>
	selector({
		get: ({ get }) =>
			!get(isAwoken)
			&& get(isStageCompleted)
			&& get(location) === "wilderness"
			&& get(stage) === FINALITY_STAGE["res cogitans"]
			&& get(essenceLoot) === 0
			&& (get(encounter) !== "void" || get(isFinalityDefeated("res cogitans"))),
		key,
	}),
)

export const encounter = withStateKey("encounter", key =>
	selector({
		get: ({ get }) => {
			const stageValue = get(stage)

			if (stageValue === FINALITY_STAGE["res cogitans"]) {
				if (get(isFinalityDefeated("res cogitans")) || get(ownedItem("familiar")) === undefined) {
					return "void"
				}

				return "res cogitans"
			}

			if (stageValue === FINALITY_STAGE["res dominus"]) {
				if (get(isFinalityDefeated("res dominus"))) {
					return "void"
				}

				return "res dominus"
			}

			return stageValue >= BOSS_STAGE_START && stageValue % BOSS_STAGE_INTERVAL === 0
				? "boss"
				: "monster"
		},
		key,
	}),
)

export const isLooting = withStateKey("isLooting", key =>
	selector({
		get: ({ get }) => get(lootingDuration) > 0,
		key,
	}),
)

export const isRecovering = withStateKey("isRecovering", key =>
	selector({
		get: ({ get }) => get(recoveryDuration) > 0,
		key,
	}),
)

export const isStageCompleted = withStateKey("isStageCompleted", key =>
	selector({
		get: ({ get }) => get(progress) >= get(progressMaximum),
		key,
	}),
)

export const locationName = withStateKey("locationName", key =>
	selector({
		get: ({ get }) => {
			if (get(location) === "wilderness") {
				return get(wildernesses)[get(stage) - 1]
			}

			return "Caravan"
		},
		key,
	}),
)

export const perkEffect = withStateKey("perkEffect", key =>
	selectorFamily({
		get: (perk: Perk) =>
			({ get }) => {
				if (perk === "essenceBonus" && (get(stage) > get(stageRetired))) {
					return 0
				}

				return getPerkEffect({ generation: get(generation), perk })
			},
		key,
	}),
)

export const progressMaximum = withStateKey("progressMaximum", key =>
	selector({
		get: ({ get }) => {
			const { maximum, minimum } = PROGRESS
			const encounterValue = get(encounter)
			const stageValue = get(stage)

			if (encounterValue === "monster") {
				if (stageValue < get(stageMaximum)) {
					return Number.POSITIVE_INFINITY
				}

				return Math.max(
					1,
					Math.round(
						getFromRange({ factor: getSigmoid(stageValue), maximum, minimum })
						* (1 - get(perkEffect("monsterReduction"))),
					),
				)
			}

			if (encounterValue === "void") {
				return 0
			}

			return 1
		},
		key,
	}),
)

export const stageMaximum = withStateKey("stageMaximum", key =>
	selector({
		get: ({ get }) => get(wildernesses).length,
		key,
	}),
)

// ATOMS

export const attackDuration = withStateKey("attackDuration", key =>
	atom({
		default: 0,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const consciousness = withStateKey("consciousness", key =>
	atom<"mors" | "somnium" | "vigilans">({
		default: "somnium",
		effects: [handleStorage({ key })],
		key,
	}),
)

export const corpse = withStateKey("corpse", key =>
	atom<{ essence: number, stage: number } | undefined>({
		default: undefined,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const generation = withStateKey("generation", key =>
	atom({
		default: 1,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const isAttacking = withStateKey("isAttacking", key =>
	atom({
		default: false,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const isAwoken = withStateKey("isAwoken", key =>
	atom({
		default: false,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const isFinalityDefeated = withStateKey("isFinalityDefeated", key =>
	atomFamily<boolean, Finality>({
		default: false,
		effects: finality => [handleStorage({ key, parameter: finality })],
		key,
	}),
)

export const isStageStarted = withStateKey("isStageStarted", key =>
	atom({
		default: false,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const location = withStateKey("location", key =>
	atom<"caravan" | "wilderness">({
		default: "wilderness",
		effects: [handleStorage({ key })],
		key,
	}),
)

export const lootingDuration = withStateKey("lootingDuration", key =>
	atom({
		default: 0,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const name = withStateKey("name", key =>
	atom({
		default: LABEL_UNKNOWN,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const progress = withStateKey("progress", key =>
	atom({
		default: 0,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const recoveryDuration = withStateKey("recoveryDuration", key =>
	atom({
		default: 0,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const stage = withStateKey("stage", key =>
	atom({
		default: stageMaximum,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const stageHighest = withStateKey("stageHighest", key =>
	atom({
		default: stageMaximum,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const stageRetired = withStateKey("stageRetired", key =>
	atom({
		default: 0,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const statusElement = withStateKey("statusElement", key =>
	atom<HTMLDivElement | null>({
		default: null,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const wildernesses = withStateKey("wildernesses", key =>
	atom<string[]>({
		default: [],
		effects: [handleStorage({ key })],
		key,
	}),
)

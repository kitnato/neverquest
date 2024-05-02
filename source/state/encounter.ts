import { atom, atomFamily, selector } from "recoil"

import { PROGRESS } from "@neverquest/data/encounter"
import { BOSS_STAGE_INTERVAL, BOSS_STAGE_START, FINALITY_STAGE } from "@neverquest/data/monster"
import { handleStorage } from "@neverquest/state/effects/handleStorage"
import { ownedItem } from "@neverquest/state/inventory"
import { essenceLoot } from "@neverquest/state/resources"
import { getFromRange, getPerkEffect, getSigmoid } from "@neverquest/utilities/getters"
import { withStateKey } from "@neverquest/utilities/helpers"

import type { Finality } from "@neverquest/types/unions"

// SELECTORS

export const canAwaken = withStateKey("canAwaken", key =>
	selector({
		get: ({ get }) =>
			!get(hasAwoken)
			&& get(isStageCompleted)
			&& get(location) === "wilderness"
			&& get(stage) === FINALITY_STAGE["res cogitans"]
			&& get(essenceLoot) === 0
			&& (get(encounter) !== "void" || get(hasDefeatedFinality("res cogitans"))),
		key,
	}),
)

export const encounter = withStateKey("encounter", key =>
	selector({
		get: ({ get }) => {
			const stageValue = get(stage)

			if (stageValue === FINALITY_STAGE["res cogitans"]) {
				if (get(hasDefeatedFinality("res cogitans")) || get(ownedItem("familiar")) === undefined) {
					return "void"
				}

				return "res cogitans"
			}

			if (stageValue === FINALITY_STAGE["res dominus"]) {
				if (get(hasDefeatedFinality("res dominus"))) {
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
						* (1 - getPerkEffect({ generation: get(generation), perk: "monsterReduction" })),
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

export const hasAwoken = withStateKey("hasAwoken", key =>
	atom({
		default: false,
		effects: [handleStorage({ key })],
		key,
	}),
)

export const hasDefeatedFinality = withStateKey("hasDefeatedFinality", key =>
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

export const progress = withStateKey("progress", key =>
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

export const wildernesses = withStateKey("wildernesses", key =>
	atom<string[]>({
		default: [],
		effects: [handleStorage({ key })],
		key,
	}),
)

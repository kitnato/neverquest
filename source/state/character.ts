import { computed } from "@preact/signals"

import { PROGRESS } from "@neverquest/data/character"
import { GENERIC_MINIMUM, LABEL_UNKNOWN } from "@neverquest/data/general"
import { BOSS_STAGE_INTERVAL, BOSS_STAGE_START, FINALITY_STAGE } from "@neverquest/data/monster"
import { ownedItem } from "@neverquest/state/inventory"
import { essenceLoot } from "@neverquest/state/resources"
import { getFromRange, getPerkEffect, getSigmoid } from "@neverquest/utilities/getters"
import { computedFamily, persistentSignal, persistentSignalFamily } from "@neverquest/utilities/persistentSignal"

import type { Finality, Perk } from "@neverquest/types/unions"

// COMPUTED
export const canAwaken = computed(() => isAwoken.get()
	&& isStageCompleted.value
	&& location.get() === "wilderness"
	&& stage.get() === FINALITY_STAGE["res cogitans"]
	&& essenceLoot.get() === 0
	&& (encounter.value !== "void" || isFinalityDefeated("res cogitans").get()))

export const encounter = computed(() => {
	const stageValue = stage.get()

	if (stageValue === FINALITY_STAGE["res cogitans"]) {
		if (isFinalityDefeated("res cogitans").get() || ownedItem("familiar").value === undefined) {
			return "void"
		}

		return "res cogitans"
	}

	if (stageValue === FINALITY_STAGE["res dominus"]) {
		if (isFinalityDefeated("res dominus").get()) {
			return "void"
		}

		return "res dominus"
	}

	return stageValue >= BOSS_STAGE_START && stageValue % BOSS_STAGE_INTERVAL === 0
		? "boss"
		: "monster"
})

export const isLooting = computed(() => lootingDuration.get() > 0)

export const isRecovering = computed(() => recoveryDuration.get() > 0)

export const isStageCompleted = computed(() => progress.get() >= progressMaximum.value)

export const locationName = computed(() => {
	if (location.get() === "wilderness") {
		return wildernesses.get()[stage.get() - 1]
	}

	return "Caravan"
})

export const perkEffect = computedFamily((perk: Perk) => () => {
	const generationValue = generation.get()

	if (perk === "essenceBonus" && stage.get() > stageRetired.get()) {
		return 0
	}

	return getPerkEffect({ generation: generationValue, perk })
})

export const progressMaximum = computed(() => {
	const { maximum, minimum } = PROGRESS
	const encounterValue = encounter.value
	const stageValue = stage.get()

	if (encounterValue === "monster") {
		if (stageValue < stageMaximum.value) {
			return Number.POSITIVE_INFINITY
		}

		return Math.max(
			1,
			Math.round(
				getFromRange({ factor: getSigmoid(stageValue), maximum, minimum })
				* (1 - perkEffect("monsterReduction").value),
			),
		)
	}

	if (encounterValue === "void") {
		return 0
	}

	return 1
})

export const stageMaximum = computed(() => wildernesses.get().length)

// SIGNALS

export const attackDuration = persistentSignal({
	key: "attackDuration",
	value: 0,
})

export const consciousness = persistentSignal<"mors" | "somnium" | "vigilans">({
	key: "consciousness",
	value: "somnium",
})

export const corpse = persistentSignal<{ essence: number, stage: number } | null>({
	key: "corpse",
	value: null,
})

export const generation = persistentSignal({
	key: "generation",
	value: 1,
})

export const isAttacking = persistentSignal({
	key: "isAttacking",
	value: false,
})

export const isAwoken = persistentSignal({
	key: "isAwoken",
	value: false,
})

export const isFinalityDefeated = persistentSignalFamily<Finality, boolean>({
	key: "isFinalityDefeated",
	value: false,
})

export const isStageStarted = persistentSignal({
	key: "isStageStarted",
	value: false,
})

export const location = persistentSignal<"caravan" | "wilderness">({
	key: "location",
	value: "wilderness",
})

export const lootingDuration = persistentSignal({
	key: "lootingDuration",
	value: 0,
})

export const name = persistentSignal({
	key: "name",
	value: LABEL_UNKNOWN,
})

export const progress = persistentSignal({
	key: "progress",
	value: 0,
})

export const recoveryDuration = persistentSignal({
	key: "recoveryDuration",
	value: 0,
})

export const stage = persistentSignal({
	key: "stage",
	value: GENERIC_MINIMUM,
})

export const stageHighest = persistentSignal({
	key: "stageHighest",
	value: GENERIC_MINIMUM,
})

export const stageRetired = persistentSignal({
	key: "stageRetired",
	value: GENERIC_MINIMUM,
})

export const statusElement = persistentSignal<HTMLDivElement | null>({
	key: "statusElement",
	value: null,
})

export const wildernesses = persistentSignal<string[]>({
	key: "wildernesses",
	value: [],
})

import { computed } from "@preact/signals"
import { nanoid } from "nanoid"

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
import { computedFamily, persistentSignal, persistentSignalFamily } from "@neverquest/utilities/persistentSignal"

import type { Ailment } from "@neverquest/types/unions"

// COMPUTED

const bleedingDeltaLength = computed(() => {
	const { duration, ticks } = bleed.value

	return Math.round(duration / ticks)
})

export const blightChance = computed(() => {
	const encounterValue = encounter.value
	const stageValue = stage.get()

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
})

export const frailty = computed(() => {
	if (isFinality(encounter.value)) {
		return 0
	}

	if (ownedItem("familiar").value !== undefined) {
		return FRAILTY.familiar
	}

	if (ownedItem("mysterious egg").value !== undefined) {
		return getFromRange({
			factor: getSigmoid(infusionEffect("mysterious egg").value * LEVELLING_MAXIMUM),
			...FRAILTY["mysterious egg"],
		})
	}

	return 0
})

export const isEnraged = computed(() => isRelicEquipped("war mask").get() || rage.get() === RAGE.maximum)

export const isMonsterAiling = computedFamily((ailment: Ailment) => () => monsterAilmentDuration(ailment).get() > 0)

export const isMonsterAtFullHealth = computed(() => monsterHealth.get() === monsterHealthMaximum.value)

export const isMonsterClose = computed(() => distance.get() === 0)

export const isMonsterDead = computed(() => isStageStarted.get() && monsterHealth.get() === 0)

export const isMonsterDistant = computed(() => distance.get() >= range.value)

export const isMonsterRegenerating = computed(() => monsterRegenerationDuration.get() > 0)

export const monsterAttackRate = computed(() => {
	const { attenuation, finality, maximum, minimum } = MONSTER_ATTACK_RATE
	const encounterValue = encounter.value

	if (isFinality(encounterValue)) {
		return finality[encounterValue]
	}

	return Math.round(
		Math.max(
			maximum - maximum * getTriangular(stage.get() / attenuation),
			minimum,
		) * (isEnraged.value ? RAGE.effect : 1),
	)
})

export const monsterDamage = computed(() => {
	const {
		attenuation,
		base,
		bossModifier,
		finality,
		menace: { maximum, minimum, requiredStage },
		progressModifier,
	} = MONSTER_DAMAGE
	const encounterValue = encounter.value
	const stageValue = stage.get()

	if (isFinality(encounterValue)) {
		return finality[encounterValue]
	}

	return Math.round((base + getTriangular(stageValue) / attenuation) * (
		1
		+ Math.min(progress.get(), PROGRESS.maximum) * progressModifier
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
	) * (1 + frailty.value))
})

export const monsterDamageAiling = computed(() => Math.round(
	monsterDamage.value
	* (isMonsterAiling("staggered").value ? 1 - AILMENT_PENALTY.staggered : 1),
))

export const monsterDamageAilingPerSecond = computed(() => {
	const { frozen, stunned } = AILMENT_PENALTY

	return formatNumber({
		format: "float",
		value: getDamagePerRate({
			damage: monsterDamageAiling.value,
			damageModifier: 0,
			damageModifierChance: isMonsterAiling("stunned").value ? stunned : undefined,
			rate: monsterAttackRate.value,
			rateModifier: isMonsterAiling("frozen").value ? frozen : undefined,
		}),
	})
})

export const monsterHealthMaximum = computed(() => {
	const {
		attenuation,
		base,
		bossModifier,
		finality,
		menace: { maximum, minimum, requiredStage },
		progressModifier,
	} = MONSTER_HEALTH
	const encounterValue = encounter.value
	const stageValue = stage.get()

	if (isFinality(encounterValue)) {
		return finality[encounterValue]
	}

	return Math.round((base + getTriangular(stageValue) / attenuation) * (
		1
		+ Math.min(progress.get(), PROGRESS.maximum) * progressModifier
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
	) * (1 + frailty.value))
})

export const monsterLoot = computed(() => {
	const { attenuation, base, bossModifier, finality, progressModifier } = ESSENCE
	const { equalStage, lowerStageEssence, lowerStageGems } = LOOT_MODIFIER

	const encounterValue = encounter.value
	const isMementoOwned = ownedItem("memento").value !== undefined
	const stageValue = stage.get()
	const stageHighestValue = stageHighest.get()

	return {
		essence: Math.max(
			isFinality(encounterValue)
				? finality[encounterValue]
				: Math.round((base + getTriangular(stageValue) / attenuation) * (
					1
					+ progress.get() * progressModifier
					+ (encounterValue === "boss" ? bossModifier : 0)
					+ perkEffect("essenceBonus").value
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
		relic: encounterValue === "boss" || ownedItem("knapsack").value === undefined
			? undefined
			: encounterValue === "res dominus" && isMementoOwned && !isInheritableLooted("mysterious egg").get() && !isInheritableLooted("familiar").get()
				// Mysterious egg only drops after defeating Res Dominus while carrying the Memento and if the egg nor the familiar have ever been looted.
				? { ...INFUSABLES["mysterious egg"].item, ID: nanoid() }
				// Log Entry only drops after defeating Res Dominus while carrying the Memento and if it's never been looted before.
				: encounterValue === "res dominus" && isMementoOwned && !isInheritableLooted("[S751NQ]").get()
					? { ...RELICS["[S751NQ]"].item, ID: nanoid() }
					: isMementoOwned && !isInheritableLooted("torn manuscript").get() && isHired("alchemist").get() && !isSkillTrained("memetics").get() && Math.random() <= getFromRange({ factor: getSigmoid(stageValue), ...RELIC_DROP_CHANCE["torn manuscript"] })
						// Torn manuscript drops if it's never been looted before, if the memento is carried, if the correct crew member is hired, if the associated skill hasn't been trained and if the drop chance is reached.
						? { ...RELICS["torn manuscript"].item, ID: nanoid() }
						: isMementoOwned && !isInheritableLooted("dream catcher").get() && isHired("occultist").get() && !isSkillTrained("meditation").get() && Math.random() <= getFromRange({ factor: getSigmoid(stageValue), ...RELIC_DROP_CHANCE["dream catcher"] })
							// Dream catcher drops if it's never been looted before, if the memento is carried, if the correct crew member is hired, if the associated skill hasn't been trained and if the drop chance is reached.
							? { ...RELICS["dream catcher"].item, ID: nanoid() }
							: !isInheritableLooted("memento").get() && Math.random() <= getFromRange({ factor: getSigmoid(stageValue), ...RELIC_DROP_CHANCE.memento })
								// Memento drops if it's never been looted before and if the drop chance is reached.
								? { ...RELICS.memento.item, ID: nanoid() }
								: undefined,
	}
})

export const poisonChance = computed(() => {
	const encounterValue = encounter.value
	const stageValue = stage.get()

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
})

// SIGNALS

export const bleedingDelta = persistentSignal({
	key: "bleedingDelta",
	value: bleedingDeltaLength.value,
})

export const distance = persistentSignal({
	key: "distance",
	value: range.value,
})

export const isMonsterNew = persistentSignal({
	key: "isMonsterNew",
	value: true,
})

export const monsterAilmentDuration = persistentSignalFamily<Ailment, number>({
	key: "monsterAilmentDuration",
	value: 0,
})

export const monsterAttackDuration = persistentSignal({
	key: "monsterAttackDuration",
	value: 0,
})

export const monsterElement = persistentSignal<HTMLDivElement | null>({
	key: "monsterElement",
	value: null,
})

export const monsterHealth = persistentSignal({
	key: "monsterHealth",
	value: monsterHealthMaximum.value,
})

export const monsterName = persistentSignal<string | null>({
	key: "monsterName",
	value: null,
})

export const monsterRegenerationDuration = persistentSignal({
	key: "monsterRegenerationDuration",
	value: 0,
})

export const rage = persistentSignal({
	key: "rage",
	value: 0,
})

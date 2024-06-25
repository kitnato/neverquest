import { computed } from "@preact/signals"

import { SKILLS, SKILL_PRICE_BASE, SKILL_PRICE_FACTOR } from "@neverquest/data/skills"
import { SKILL_TYPES, type Skill } from "@neverquest/types/unions"
import { persistentSignalFamily } from "@neverquest/utilities/persistentSignal"

// COMPUTED

export const skillPrice = computed(() => Math.round(
	SKILL_PRICE_BASE * Math.pow(
		SKILL_PRICE_FACTOR,
		Object
			.entries(trainedSkills.value)
			.filter(([skill, isTrained]) => !SKILLS[skill as Skill].isInheritable && isTrained).length),
))

export const trainedSkills = computed(() => {
	const currentTrainedSkills = {} as Record<Skill, boolean>

	for (const skill of SKILL_TYPES) {
		currentTrainedSkills[skill] = isSkillTrained(skill).get()
	}

	return currentTrainedSkills
})

// SIGNALS

export const isSkillTrained = persistentSignalFamily<Skill, boolean>({
	key: "isSkillTrained",
	value: false,
})

import { atomFamily, selector } from "recoil"

import { SKILLS, SKILL_PRICE_BASE, SKILL_PRICE_FACTOR } from "@neverquest/data/skills"
import { handleStorage } from "@neverquest/state/effects/handleStorage"
import { SKILL_TYPES, type Skill } from "@neverquest/types/unions"
import { withStateKey } from "@neverquest/utilities/helpers"

// SELECTORS

export const skillPrice = withStateKey("skillPrice", key =>
	selector({
		get: ({ get }) => Math.round(
			SKILL_PRICE_BASE * Math.pow(
				SKILL_PRICE_FACTOR,
				Object
					.entries(get(trainedSkills))
					.filter(([skill, isTrained]) => !SKILLS[skill as Skill].isInheritable && isTrained).length),
		),
		key,
	}),
)

export const trainedSkills = withStateKey("trainedSkills", key =>
	selector({
		get: ({ get }) => {
			const currentTrainedSkills = {} as Record<Skill, boolean>

			for (const skill of SKILL_TYPES) {
				currentTrainedSkills[skill] = get(isSkillTrained(skill))
			}

			return currentTrainedSkills
		},
		key,
	}),
)

// ATOMS

export const isSkillTrained = withStateKey("isSkillTrained", key =>
	atomFamily<boolean, Skill>({
		default: false,
		effects: skill => [handleStorage({ key, parameter: skill })],
		key,
	}),
)

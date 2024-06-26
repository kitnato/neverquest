import { useRecoilCallback } from "recoil"

import { ATTRIBUTES } from "@neverquest/data/attributes"
import { MASTERIES } from "@neverquest/data/masteries"
import { QUEST_REQUIREMENTS } from "@neverquest/data/quests"
import { SKILLS } from "@neverquest/data/skills"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { isSkillTrained, trainedSkills } from "@neverquest/state/skills"
import { isShowing } from "@neverquest/state/ui"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

import type { Skill } from "@neverquest/types/unions"

export function useTrainSkill() {
	const progressQuest = useProgressQuest()

	return useRecoilCallback(
		({ set, snapshot }) =>
			(skill: Skill) => {
				const get = getSnapshotGetter(snapshot)

				const { shows } = SKILLS[skill]
				const trainedSkillsValue = get(trainedSkills)

				set(isSkillTrained(skill), true)

				if (shows !== undefined) {
					for (const show of shows) {
						set(isShowing(show), true)
					}
				}

				const unlockedAttributesCount = Object.values(ATTRIBUTES).filter(({ requiredSkill }) => requiredSkill === skill).length

				progressQuest({
					amount: unlockedAttributesCount,
					quest: "attributesUnlocking",
				})

				if (Object.values(MASTERIES).some(({ requiredSkill }) => requiredSkill === skill)) {
					progressQuest({ quest: "masteriesUnlocking" })
				}

				if (
					skill === "archery"
					&& Object.entries(trainedSkillsValue)
						.filter(([trainedSkill]) => !SKILLS[trainedSkill as Skill].isInheritable)
						.every(([, isTrained]) => !isTrained)
				) {
					progressQuest({ quest: "acquiringArcheryFirst" })
				}

				progressQuest({ quest: "skillsTraining" })

				if (QUEST_REQUIREMENTS.skillsCraft.includes(skill)) {
					progressQuest({ quest: "skillsCraft" })
				}
			},
		[progressQuest],
	)
}

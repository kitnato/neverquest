import { useRecoilCallback } from "recoil"

import { ATTRIBUTES } from "@neverquest/data/attributes"
import { MASTERIES } from "@neverquest/data/masteries"
import { QUEST_REQUIREMENTS } from "@neverquest/data/quests"
import { SKILLS } from "@neverquest/data/skills"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { acquiredSkills, isSkillAcquired } from "@neverquest/state/skills"
import { isShowing } from "@neverquest/state/ui"
import type { Skill } from "@neverquest/types/unions"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

export function useAcquireSkill() {
  const progressQuest = useProgressQuest()

  return useRecoilCallback(
    ({ set, snapshot }) =>
      (skill: Skill) => {
        const get = getSnapshotGetter(snapshot)

        const { skillsCraft } = QUEST_REQUIREMENTS
        const { shows } = SKILLS[skill]
        const acquiredSkillsValue = get(acquiredSkills)

        set(isSkillAcquired(skill), true)

        if (shows !== undefined) {
          for (const show of shows) {
            set(isShowing(show), true)
          }
        }

        if (Object.values(ATTRIBUTES).some(({ requiredSkill }) => requiredSkill === skill)) {
          progressQuest({ quest: `attributesUnlocking` })
        }

        if (Object.values(MASTERIES).some(({ requiredSkill }) => requiredSkill === skill)) {
          progressQuest({ quest: `masteries` })
          progressQuest({ quest: `masteriesAll` })
        }

        if (
          Object.values(acquiredSkillsValue).every((hasAcquiredSkill) => !hasAcquiredSkill) &&
          skill === `archery`
        ) {
          progressQuest({ quest: `acquiringArcheryFirst` })
        }

        progressQuest({ quest: `skills` })
        progressQuest({ quest: `skillsAll` })

        if (skillsCraft.includes(skill)) {
          progressQuest({ quest: `skillsCraft` })
        }
      },
    [progressQuest],
  )
}

import { useRecoilCallback } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { MASTERIES } from "@neverquest/data/masteries";
import { QUEST_REQUIREMENTS } from "@neverquest/data/quests";
import { SKILLS } from "@neverquest/data/skills";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { isShowing } from "@neverquest/state/isShowing";
import { acquiredSkills, isSkillAcquired } from "@neverquest/state/skills";
import type { Mastery, Skill } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useAcquireSkill() {
  const progressQuest = useProgressQuest();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      (skill: Skill) => {
        const get = getSnapshotGetter(snapshot);

        const { skillsCraft } = QUEST_REQUIREMENTS;
        const { shows } = SKILLS[skill];
        const acquiredSkillsValue = get(acquiredSkills);
        const newUnlockedMasteries = Object.entries(MASTERIES)
          .filter(([_, { requiredSkill }]) => requiredSkill === skill)
          .map(([current]) => current as Mastery);

        set(isSkillAcquired(skill), true);
        set(isShowing("skills"), true);

        if (shows !== undefined) {
          for (const show of shows) {
            set(isShowing(show), true);
          }
        }

        if (newUnlockedMasteries.length > 0) {
          set(isShowing("masteries"), true);

          for (const _ of newUnlockedMasteries) {
            progressQuest({ quest: "masteries" });
            progressQuest({ quest: "masteriesAll" });
          }
        }

        if (
          Object.values(acquiredSkillsValue).every((current) => !current) &&
          skill === "archery"
        ) {
          progressQuest({ quest: "acquiringArcheryFirst" });
        }

        if (
          [
            ...Object.entries(acquiredSkillsValue)
              .filter(([_, current]) => current)
              .map(([current]) => current),
            skill,
          ]
            .toSorted((current1, current2) => current1.localeCompare(current2))
            .toString() ===
          Object.values(ATTRIBUTES)
            .map(({ requiredSkill }) => requiredSkill)
            .filter((current): current is Skill => current !== undefined)
            .toSorted((current1, current2) => current1.localeCompare(current2))
            .toString()
        ) {
          progressQuest({ quest: "attributesUnlockingAll" });
        }

        progressQuest({ quest: "skills" });
        progressQuest({ quest: "skillsAll" });

        if (skillsCraft.includes(skill)) {
          progressQuest({ quest: "skillsCraft" });
        }
      },
    [progressQuest],
  );
}

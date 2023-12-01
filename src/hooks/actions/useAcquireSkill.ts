import { useRecoilCallback } from "recoil";

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

        const { shows } = SKILLS[skill];
        const newUnlockedMasteries = Object.entries(MASTERIES)
          .filter(([_, { requiredSkill }]) => requiredSkill === skill)
          .map(([current]) => current as Mastery);
        const { skillsCraft } = QUEST_REQUIREMENTS;

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
          Object.values(get(acquiredSkills)).every((current) => !current) &&
          skill === "archery"
        ) {
          progressQuest({ quest: "acquiringArcheryFirst" });
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

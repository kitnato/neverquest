import { useRecoilCallback } from "recoil";

import { QUEST_REQUIREMENTS } from "@neverquest/data/quests";
import { SKILLS } from "@neverquest/data/skills";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { isAttributeUnlocked } from "@neverquest/state/attributes";
import { isShowing } from "@neverquest/state/isShowing";
import { isMasteryUnlocked } from "@neverquest/state/masteries";
import { isSkillAcquired } from "@neverquest/state/skills";
import { MASTERY_TYPES, SKILL_TYPES, type Skill } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useAcquireSkill() {
  const progressQuest = useProgressQuest();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      (skill: Skill) => {
        const get = getSnapshotGetter(snapshot);

        const { shows, unlocksAttributes, unlocksMastery } = SKILLS[skill];

        set(isSkillAcquired(skill), true);
        set(isShowing("skills"), true);

        if (shows !== undefined) {
          shows.forEach((current) => set(isShowing(current), true));
        }

        unlocksAttributes?.forEach((attribute) => {
          set(isAttributeUnlocked(attribute), { current: true });
        });

        if (unlocksMastery !== undefined) {
          set(isShowing("masteries"), true);
          set(isMasteryUnlocked(unlocksMastery), true);

          progressQuest({ quest: "masteries" });

          if (
            MASTERY_TYPES.every((current) => !get(isMasteryUnlocked(current))) &&
            skill === "archery"
          ) {
            progressQuest({ quest: "acquiringArcheryFirst" });
          }

          if (
            MASTERY_TYPES.filter((current) => current !== unlocksMastery).every((current) =>
              get(isMasteryUnlocked(current)),
            )
          ) {
            progressQuest({ quest: "masteriesAll" });
          }
        }

        progressQuest({ quest: "skills" });

        const { skillsCraft } = QUEST_REQUIREMENTS;

        if (
          skillsCraft.includes(skill) &&
          skillsCraft
            .filter((current) => current !== skill)
            .every((current) => get(isSkillAcquired(current)))
        ) {
          progressQuest({ quest: "skillsCraft" });
        }

        if (
          SKILL_TYPES.filter((current) => current !== skill).every((current) =>
            get(isSkillAcquired(current)),
          )
        ) {
          progressQuest({ quest: "skillsAll" });
        }
      },
    [progressQuest],
  );
}

import { useRecoilCallback } from "recoil";

import { SKILLS } from "@neverquest/data/skills";
import { isAttributeUnlocked } from "@neverquest/state/attributes";
import { isShowing } from "@neverquest/state/isShowing";
import { isMasteryUnlocked } from "@neverquest/state/masteries";
import { isSkillAcquired } from "@neverquest/state/skills";
import type { Skill } from "@neverquest/types/unions";

export function useAcquireSkill() {
  return useRecoilCallback(
    ({ set }) =>
      (skill: Skill) => {
        const { shows, unlocksAttributes, unlocksMastery } = SKILLS[skill];

        set(isSkillAcquired(skill), true);
        set(isShowing("skills"), true);

        if (shows !== undefined) {
          set(isShowing(shows), true);
        }

        unlocksAttributes?.forEach((attribute) => {
          set(isAttributeUnlocked(attribute), { isUnlocked: true });
        });

        if (unlocksMastery !== undefined) {
          set(isShowing("masteries"), true);
          set(isMasteryUnlocked(unlocksMastery), true);
        }
      },
    [],
  );
}

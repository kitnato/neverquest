import { useRecoilCallback } from "recoil";

import { SKILLS } from "@neverquest/data/skills";
import { attributes } from "@neverquest/state/attributes";
import { isShowing } from "@neverquest/state/isShowing";
import { masteries } from "@neverquest/state/masteries";
import { skills } from "@neverquest/state/skills";
import type { Skill } from "@neverquest/types/unions";

export function useAcquireSkill() {
  return useRecoilCallback(
    ({ set }) =>
      (skill: Skill) => {
        const { shows, unlocksAttributes, unlocksMastery } = SKILLS[skill];

        set(skills(skill), true);

        set(isShowing("skills"), true);

        shows?.forEach((show) => {
          set(isShowing(show), true);
        });

        unlocksAttributes?.forEach((attribute) => {
          set(attributes(attribute), (current) => ({ ...current, isUnlocked: true }));
        });

        if (unlocksMastery !== undefined) {
          set(isShowing("masteries"), true);
          set(masteries(unlocksMastery), (current) => ({ ...current, isUnlocked: true }));
        }
      },
    [],
  );
}

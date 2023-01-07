import { atomFamily, selectorFamily } from "recoil";

import localStorage from "@neverquest/state/effects/localStorage";
import { skills } from "@neverquest/state/skills";
import { MasteryType, ShowingType, SkillType, StorageKey } from "@neverquest/types/enums";

// SELECTORS

export const isShowingMastery = selectorFamily<boolean, MasteryType | null>({
  get:
    (type) =>
    ({ get }) => {
      switch (type) {
        case MasteryType.BleedDamage: {
          return get(skills(SkillType.Bleed));
        }
        case MasteryType.ParryFactor: {
          return get(skills(SkillType.Parry));
        }
        case MasteryType.StaggerDuration: {
          return get(skills(SkillType.Stagger));
        }
        default: {
          return (
            get(skills(SkillType.Bleed)) ||
            get(skills(SkillType.Parry)) ||
            get(skills(SkillType.Stagger))
          );
        }
      }
    },
  key: "isShowingMastery",
});

// ATOMS

export const isShowing = atomFamily<boolean, ShowingType>({
  default: false,
  effects: (parameter) => [localStorage<boolean>(`${StorageKey.IsShowing}-${parameter}`)],
  key: StorageKey.IsShowing,
});

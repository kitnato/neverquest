import { atomFamily, selectorFamily } from "recoil";

import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { skills } from "@neverquest/state/skills";
import { MasteryType, type ShowingType, SkillType } from "@neverquest/types/enums";

// SELECTORS

export const isShowingMastery = withStateKey("isShowingMastery", (key) =>
  selectorFamily<boolean, MasteryType | null>({
    get:
      (type) =>
      ({ get }) => {
        switch (type) {
          case MasteryType.BleedDamage: {
            return get(skills(SkillType.Bleed));
          }
          case MasteryType.Stability: {
            return get(skills(SkillType.Shields));
          }
          case MasteryType.ParryFactor: {
            return get(skills(SkillType.Parry));
          }
          case MasteryType.Tenacity: {
            return get(skills(SkillType.Armors));
          }
          case MasteryType.StaggerDuration: {
            return get(skills(SkillType.Stagger));
          }
          default: {
            return (
              get(skills(SkillType.Armors)) ||
              get(skills(SkillType.Bleed)) ||
              get(skills(SkillType.Parry)) ||
              get(skills(SkillType.Shields)) ||
              get(skills(SkillType.Stagger))
            );
          }
        }
      },
    key,
  })
);

// ATOMS

export const isShowing = withStateKey("isShowing", (key) =>
  atomFamily<boolean, ShowingType>({
    default: false,
    effects: (parameter) => [handleLocalStorage<boolean>({ key, parameter })],
    key,
  })
);

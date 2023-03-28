import { atomFamily, selectorFamily } from "recoil";

import { handleLocalStorage } from "@neverquest/state/effects/handleLocalStorage";
import { skills } from "@neverquest/state/skills";
import { MasteryType, ShowingType, SkillType } from "@neverquest/types/enums";

// SELECTORS

export const isShowingMastery = selectorFamily<boolean, MasteryType | null>({
  get:
    (type) =>
    ({ get }) => {
      switch (type) {
        case MasteryType.BleedDamage: {
          return get(skills(SkillType.Bleed));
        }
        case MasteryType.FreeBlockChance: {
          return get(skills(SkillType.Shields));
        }
        case MasteryType.ParryFactor: {
          return get(skills(SkillType.Parry));
        }
        case MasteryType.SkipRecoveryChance: {
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
  key: "isShowingMastery",
});

// ATOMS

export const isShowing = atomFamily<boolean, ShowingType>({
  default: false,
  effects: (parameter) => [handleLocalStorage<boolean>({ key: "isShowing", parameter })],
  key: "isShowing",
});

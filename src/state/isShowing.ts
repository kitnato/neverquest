import { atomFamily, selectorFamily } from "recoil";

import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { skills } from "@neverquest/state/skills";
import { Mastery, type Showing, Skill } from "@neverquest/types/enums";

// SELECTORS

export const isShowingMastery = withStateKey("isShowingMastery", (key) =>
  selectorFamily<boolean, Mastery | null>({
    get:
      (type) =>
      ({ get }) => {
        switch (type) {
          case Mastery.Cruelty: {
            return get(skills(Skill.Anatomy));
          }
          case Mastery.Stability: {
            return get(skills(Skill.Shieldcraft));
          }
          case Mastery.Finesse: {
            return get(skills(Skill.Escrime));
          }
          case Mastery.Tenacity: {
            return get(skills(Skill.Armorcraft));
          }
          case Mastery.Might: {
            return get(skills(Skill.Traumatology));
          }
          default: {
            return (
              get(skills(Skill.Armorcraft)) ||
              get(skills(Skill.Anatomy)) ||
              get(skills(Skill.Escrime)) ||
              get(skills(Skill.Shieldcraft)) ||
              get(skills(Skill.Traumatology))
            );
          }
        }
      },
    key,
  })
);

// ATOMS

export const isShowing = withStateKey("isShowing", (key) =>
  atomFamily<boolean, Showing>({
    default: false,
    effects: (parameter) => [handleLocalStorage<boolean>({ key, parameter })],
    key,
  })
);

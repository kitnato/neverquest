import { DefaultValue, atomFamily, selector, selectorFamily } from "recoil";

import { ATTRIBUTES, ATTRIBUTES_ORDER } from "@neverquest/data/attributes";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { attributes } from "@neverquest/state/attributes";
import { Skill } from "@neverquest/types/enums";

// SELECTORS

export const skills = withStateKey("skills", (key) =>
  selectorFamily<boolean, Skill>({
    get:
      (type) =>
      ({ get }) =>
        get(skillsStatus(type)),
    key,
    set:
      (type) =>
      ({ set }, status) => {
        if (status instanceof DefaultValue) {
          return;
        }

        set(skillsStatus(type), status);

        if (status) {
          ATTRIBUTES_ORDER.forEach((attributeType) => {
            const { requiredSkill } = ATTRIBUTES[attributeType];

            if (requiredSkill === type) {
              set(attributes(attributeType), (current) => ({
                ...current,
                isUnlocked: true,
              }));
            }
          });
        }
      },
  })
);

export const skillsTrained = withStateKey("skillsTrained", (key) =>
  selector<Record<Skill, boolean>>({
    get: ({ get }) => ({
      [Skill.Armorcraft]: get(skillsStatus(Skill.Armorcraft)),
      [Skill.Anatomy]: get(skillsStatus(Skill.Anatomy)),
      [Skill.Assassination]: get(skillsStatus(Skill.Assassination)),
      [Skill.Evasion]: get(skillsStatus(Skill.Evasion)),
      [Skill.Escrime]: get(skillsStatus(Skill.Escrime)),
      [Skill.Calisthenics]: get(skillsStatus(Skill.Calisthenics)),
      [Skill.Shieldcraft]: get(skillsStatus(Skill.Shieldcraft)),
      [Skill.Traumatology]: get(skillsStatus(Skill.Traumatology)),
    }),
    key,
  })
);

// ATOMS

export const skillsStatus = withStateKey("skillsStatus", (key) =>
  atomFamily<boolean, Skill>({
    default: false,
    effects: (parameter) => [handleLocalStorage<boolean>({ key, parameter })],
    key,
  })
);

import { DefaultValue, atomFamily, selector, selectorFamily } from "recoil";

import { ATTRIBUTES, ATTRIBUTES_ORDER } from "@neverquest/data/attributes";
import { handleLocalStorage, withStateKey } from "@neverquest/state";
import { attributes } from "@neverquest/state/attributes";
import { SkillType } from "@neverquest/types/enums";

// SELECTORS

export const skills = withStateKey("skills", (key) =>
  selectorFamily<boolean, SkillType>({
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
  selector<Record<SkillType, boolean>>({
    get: ({ get }) => ({
      [SkillType.Armors]: get(skillsStatus(SkillType.Armors)),
      [SkillType.Bleed]: get(skillsStatus(SkillType.Bleed)),
      [SkillType.Criticals]: get(skillsStatus(SkillType.Criticals)),
      [SkillType.Dodge]: get(skillsStatus(SkillType.Dodge)),
      [SkillType.Parry]: get(skillsStatus(SkillType.Parry)),
      [SkillType.Regeneration]: get(skillsStatus(SkillType.Regeneration)),
      [SkillType.Shields]: get(skillsStatus(SkillType.Shields)),
      [SkillType.Stagger]: get(skillsStatus(SkillType.Stagger)),
    }),
    key,
  })
);

// ATOMS

export const skillsStatus = withStateKey("skillsStatus", (key) =>
  atomFamily<boolean, SkillType>({
    default: false,
    effects: (parameter) => [handleLocalStorage<boolean>({ key, parameter })],
    key,
  })
);

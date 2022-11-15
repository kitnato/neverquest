import { DefaultValue, atomFamily, selector, selectorFamily } from "recoil";

import { ATTRIBUTES, ATTRIBUTES_ORDER } from "@neverquest/constants/attributes";
import { attributes } from "@neverquest/state/attributes";
import localStorage from "@neverquest/state/effects/localStorage";
import { SkillType, StorageKey } from "@neverquest/types/enums";

// ATOMS

export const skillsStatus = atomFamily<boolean, SkillType>({
  default: false,
  effects: (parameter) => [localStorage<boolean>(`${StorageKey.SkillsStatus}-${parameter}`)],
  key: StorageKey.SkillsStatus,
});

// SELECTORS

export const skills = selectorFamily<boolean, SkillType>({
  get:
    (type) =>
    ({ get }) =>
      get(skillsStatus(type)),
  key: "skills",
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
});

export const skillsTrained = selector<Record<SkillType, boolean>>({
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
  key: "skillsTrained",
});

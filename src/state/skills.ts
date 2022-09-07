import { atom, atomFamily, DefaultValue, selector, selectorFamily } from "recoil";

import { localStorageEffect } from "@neverquest/state/effects";
import { SkillStatus, SkillType, StorageKey } from "@neverquest/types/enums";
import { ATTRIBUTES, ATTRIBUTES_ORDER } from "@neverquest/constants/attributes";
import { attributes } from "./attributes";

interface SkillsStatusState {
  areTrainable: SkillType[];
  areTrained: SkillType[];
}

// ATOMS

const skillsMapping = atomFamily<SkillStatus, SkillType>({
  default: SkillStatus.Unavailable,
  effects: (parameter) => [
    localStorageEffect<SkillStatus>(`${StorageKey.SkillsMapping}-${parameter}`),
  ],
  key: StorageKey.SkillsMapping,
});

export const skillsStatus = atom<SkillsStatusState>({
  default: { areTrainable: [], areTrained: [] },
  effects: [localStorageEffect<SkillsStatusState>(StorageKey.SkillsStatus)],
  key: StorageKey.SkillsStatus,
});

// SELECTORS

export const skills = selectorFamily<SkillStatus, SkillType>({
  key: "skills",
  get:
    (type) =>
    ({ get }) =>
      get(skillsMapping(type)),
  set:
    (type) =>
    ({ set }, status) => {
      if (status instanceof DefaultValue) {
        return;
      }

      set(skillsMapping(type), status);

      if (status === SkillStatus.Trainable) {
        set(skillsStatus, (current) => ({
          areTrainable: [...current.areTrainable, type],
          areTrained: current.areTrained.filter((currentType) => currentType !== type),
        }));
      }

      if (status === SkillStatus.Trained) {
        set(skillsStatus, (current) => ({
          areTrainable: current.areTrainable.filter((currentType) => currentType !== type),
          areTrained: [...current.areTrained, type],
        }));

        ATTRIBUTES_ORDER.forEach((attributeType) => {
          const { requiredSkill } = ATTRIBUTES[attributeType];

          if (requiredSkill === type) {
            set(attributes(attributeType), (current) => ({
              ...current,
              canAssign: true,
            }));
          }
        });
      }
    },
});

export const showWeaponClass = selector({
  key: "showWeaponClass",
  get: ({ get }) => {
    const { areTrained } = get(skillsStatus);
    const weaponSkills = [SkillType.Bleed, SkillType.Parry, SkillType.Stagger];

    return areTrained.some((skill) => weaponSkills.includes(skill));
  },
});

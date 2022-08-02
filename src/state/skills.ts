import { atom, atomFamily, DefaultValue, selectorFamily } from "recoil";

import { SkillStatus, SkillType } from "@neverquest/types/enums";

const skillsMapping = atomFamily<SkillStatus, SkillType>({
  default: SkillStatus.Unavailable,
  key: "skillsMapping",
});

export const skillsStatus = atom<{
  areTrainable: SkillType[];
  areTrained: SkillType[];
}>({
  key: "skillsStatus",
  default: { areTrainable: [], areTrained: [] },
});

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
      }
    },
});

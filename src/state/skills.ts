import { SkillType } from "@neverquest/types/core";
import { atomWithReset } from "jotai/utils";

export const skills = atomWithReset<
  Record<SkillType, { isAcquired: boolean; isTrainable: boolean }>
>({
  [SkillType.Criticals]: {
    isAcquired: false,
    isTrainable: true,
  },
  [SkillType.Dodging]: {
    isAcquired: false,
    isTrainable: true,
  },
  [SkillType.Parrying]: {
    isAcquired: false,
    isTrainable: true,
  },
});

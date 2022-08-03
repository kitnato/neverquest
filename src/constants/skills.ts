// TODO - diversify icons.
import icon from "@neverquest/icons/abstract-053.svg";
import { Skill } from "@neverquest/types";
import { SkillType } from "@neverquest/types/enums";

export const SKILLS: Record<SkillType, Skill> = {
  [SkillType.Criticals]: {
    description: "Unlocks the ability to deal critical strikes.",
    icon,
    name: "Assassination",
    price: 25,
  },
  [SkillType.Dodging]: {
    description: "Unlocks the ability to dodge attacks, negating all damage.",
    icon,
    name: "Evasion",
    price: 15,
  },
  [SkillType.Parrying]: {
    description: "Unlocks the ability to parry attacks, partially reflecting damage.",
    icon,
    name: "Escrime",
    price: 20,
  },
};

export const SKILLS_ORDER = [SkillType.Criticals, SkillType.Parrying, SkillType.Dodging];

export const SKILLS_INITIAL = [SkillType.Criticals, SkillType.Parrying, SkillType.Dodging];

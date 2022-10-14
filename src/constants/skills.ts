// TODO - diversify icons.
import { ReactComponent as Icon } from "@neverquest/icons/abstract-049.svg";
import { Skill } from "@neverquest/types";
import { SkillType } from "@neverquest/types/enums";

export const SKILLS: Record<SkillType, Skill> = {
  [SkillType.Armors]: {
    description: "Unlocks the use of reinforced and plate armors.",
    Icon,
    name: "Armorcraft",
    price: 50,
  },
  [SkillType.Bleed]: {
    description: "Unlocks the ability to inflict bleeding.",
    Icon,
    name: "Anatomy",
    price: 100,
  },
  [SkillType.Criticals]: {
    description: "Unlocks the ability to deal critical strikes.",
    Icon,
    name: "Assassination",
    price: 25,
  },
  [SkillType.Dodge]: {
    description: "Unlocks the ability to dodge attacks, negating all damage.",
    Icon,
    name: "Evasion",
    price: 50,
  },
  [SkillType.Parry]: {
    description: "Unlocks the ability to parry attacks, partially reflecting damage.",
    Icon,
    name: "Escrime",
    price: 30,
  },
  [SkillType.Regeneration]: {
    description: "Unlocks attributes that improve health & stamina regeneration.",
    Icon,
    name: "Calisthenics",
    price: 15,
  },
  [SkillType.Shields]: {
    description: "Unlocks the use of medium and tower shields.",
    Icon,
    name: "Shieldcraft",
    price: 50,
  },
  [SkillType.Stagger]: {
    description: "Unlocks the ability to temporarily incapacitate the attacker.",
    Icon,
    name: "Traumatology",
    price: 20,
  },
};

export const SKILLS_ORDER = [
  SkillType.Criticals,
  SkillType.Parry,
  SkillType.Dodge,
  SkillType.Stagger,
  SkillType.Regeneration,
  SkillType.Armors,
  SkillType.Shields,
  SkillType.Bleed,
];

export const SKILLS_INITIAL = [SkillType.Criticals, SkillType.Parry, SkillType.Dodge];

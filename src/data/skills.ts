// TODO - diversify icons.
import { ReactComponent as Icon } from "@neverquest/icons/abstract-049.svg";
import { Skill } from "@neverquest/types";
import { SkillType } from "@neverquest/types/enums";

export const SKILLS: Record<SkillType, Skill> = {
  [SkillType.Armors]: {
    coinPrice: 65,
    description: "Unlocks the use of reinforced and plate armors.",
    Icon,
    name: "Armorcraft",
    requiredLevel: 45,
  },
  [SkillType.Bleed]: {
    coinPrice: 65,
    description: "Unlocks the ability to inflict bleeding.",
    Icon,
    name: "Anatomy",
    requiredLevel: 40,
  },
  [SkillType.Criticals]: {
    coinPrice: 35,
    description: "Unlocks the ability to deal critical strikes.",
    Icon,
    name: "Assassination",
    requiredLevel: 15,
  },
  [SkillType.Dodge]: {
    coinPrice: 55,
    description: "Unlocks the ability to dodge attacks, negating all damage.",
    Icon,
    name: "Evasion",
    requiredLevel: 35,
  },
  [SkillType.Parry]: {
    coinPrice: 45,
    description: "Unlocks the ability to parry attacks, partially reflecting damage.",
    Icon,
    name: "Escrime",
    requiredLevel: 25,
  },
  [SkillType.Regeneration]: {
    coinPrice: 35,
    description: "Unlocks attributes that improve health & stamina regeneration.",
    Icon,
    name: "Calisthenics",
    requiredLevel: 10,
  },
  [SkillType.Shields]: {
    coinPrice: 55,
    description: "Unlocks the use of medium and tower shields.",
    Icon,
    name: "Shieldcraft",
    requiredLevel: 30,
  },
  [SkillType.Stagger]: {
    coinPrice: 45,
    description: "Unlocks the ability to temporarily stagger the attacker.",
    Icon,
    name: "Traumatology",
    requiredLevel: 20,
  },
};

export const SKILLS_ORDER = [
  SkillType.Regeneration,
  SkillType.Criticals,
  SkillType.Stagger,
  SkillType.Parry,
  SkillType.Shields,
  SkillType.Dodge,
  SkillType.Bleed,
  SkillType.Armors,
];

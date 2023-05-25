import { ReactComponent as IconPlaceholder } from "@neverquest/icons/placeholder.svg";
import type { Skill } from "@neverquest/types";
import { SkillType } from "@neverquest/types/enums";

// TODO - diversify icons.
export const SKILLS: Record<SkillType, Skill> = {
  [SkillType.Armors]: {
    coinPrice: 65,
    description: "Unlocks the use of plate armor & deflection.",
    Icon: IconPlaceholder,
    name: "Armorcraft",
    requiredLevel: 45,
  },
  [SkillType.Bleed]: {
    coinPrice: 65,
    description: "Unlocks the ability to inflict bleeding.",
    Icon: IconPlaceholder,
    name: "Anatomy",
    requiredLevel: 40,
  },
  [SkillType.Criticals]: {
    coinPrice: 35,
    description: "Unlocks the ability to deal critical strikes.",
    Icon: IconPlaceholder,
    name: "Assassination",
    requiredLevel: 15,
  },
  [SkillType.Dodge]: {
    coinPrice: 55,
    description: "Unlocks the ability to dodge attacks, negating all damage.",
    Icon: IconPlaceholder,
    name: "Evasion",
    requiredLevel: 35,
  },
  [SkillType.Parry]: {
    coinPrice: 45,
    description: "Unlocks the ability to parry attacks, partially reflecting damage.",
    Icon: IconPlaceholder,
    name: "Escrime",
    requiredLevel: 25,
  },
  [SkillType.Regeneration]: {
    coinPrice: 35,
    description: "Unlocks attributes that improve health & stamina regeneration.",
    Icon: IconPlaceholder,
    name: "Calisthenics",
    requiredLevel: 10,
  },
  [SkillType.Shields]: {
    coinPrice: 55,
    description: "Unlocks the use of tower shields.",
    Icon: IconPlaceholder,
    name: "Shieldcraft",
    requiredLevel: 30,
  },
  [SkillType.Stagger]: {
    coinPrice: 45,
    description: "Unlocks the ability to temporarily stagger the attacker.",
    Icon: IconPlaceholder,
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

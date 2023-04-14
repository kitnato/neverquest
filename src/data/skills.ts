import { ICON_PLACEHOLDER } from "@neverquest/constants";
import type { Skill } from "@neverquest/types";
import { SkillType } from "@neverquest/types/enums";

// TODO - diversify icons.
export const SKILLS: Record<SkillType, Skill> = {
  [SkillType.Armors]: {
    coinPrice: 65,
    description: "Unlocks the use of reinforced and plate armors.",
    Icon: ICON_PLACEHOLDER,
    name: "Armorcraft",
    requiredLevel: 45,
  },
  [SkillType.Bleed]: {
    coinPrice: 65,
    description: "Unlocks the ability to inflict bleeding.",
    Icon: ICON_PLACEHOLDER,
    name: "Anatomy",
    requiredLevel: 40,
  },
  [SkillType.Criticals]: {
    coinPrice: 35,
    description: "Unlocks the ability to deal critical strikes.",
    Icon: ICON_PLACEHOLDER,
    name: "Assassination",
    requiredLevel: 15,
  },
  [SkillType.Dodge]: {
    coinPrice: 55,
    description: "Unlocks the ability to dodge attacks, negating all damage.",
    Icon: ICON_PLACEHOLDER,
    name: "Evasion",
    requiredLevel: 35,
  },
  [SkillType.Parry]: {
    coinPrice: 45,
    description: "Unlocks the ability to parry attacks, partially reflecting damage.",
    Icon: ICON_PLACEHOLDER,
    name: "Escrime",
    requiredLevel: 25,
  },
  [SkillType.Regeneration]: {
    coinPrice: 35,
    description: "Unlocks attributes that improve health & stamina regeneration.",
    Icon: ICON_PLACEHOLDER,
    name: "Calisthenics",
    requiredLevel: 10,
  },
  [SkillType.Shields]: {
    coinPrice: 55,
    description: "Unlocks the use of medium and tower shields.",
    Icon: ICON_PLACEHOLDER,
    name: "Shieldcraft",
    requiredLevel: 30,
  },
  [SkillType.Stagger]: {
    coinPrice: 45,
    description: "Unlocks the ability to temporarily stagger the attacker.",
    Icon: ICON_PLACEHOLDER,
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

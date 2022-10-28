// TODO - diversify icons.
import { ReactComponent as Icon } from "@neverquest/icons/abstract-049.svg";
import { WeaponClass } from "@neverquest/locra/types";
import { Skill } from "@neverquest/types";
import { SkillType } from "@neverquest/types/enums";

export const SKILLS: Record<SkillType, Skill> = {
  [SkillType.Armors]: {
    description: "Unlocks the use of reinforced and plate armors.",
    Icon,
    name: "Armorcraft",
    price: 65,
    requiredLevel: 45,
  },
  [SkillType.Bleed]: {
    description: "Unlocks the ability to inflict bleeding.",
    Icon,
    name: "Anatomy",
    price: 65,
    requiredLevel: 40,
  },
  [SkillType.Criticals]: {
    description: "Unlocks the ability to deal critical strikes.",
    Icon,
    name: "Assassination",
    price: 35,
    requiredLevel: 15,
  },
  [SkillType.Dodge]: {
    description: "Unlocks the ability to dodge attacks, negating all damage.",
    Icon,
    name: "Evasion",
    price: 55,
    requiredLevel: 35,
  },
  [SkillType.Parry]: {
    description: "Unlocks the ability to parry attacks, partially reflecting damage.",
    Icon,
    name: "Escrime",
    price: 45,
    requiredLevel: 25,
  },
  [SkillType.Regeneration]: {
    description: "Unlocks attributes that improve health & stamina regeneration.",
    Icon,
    name: "Calisthenics",
    price: 35,
    requiredLevel: 10,
  },
  [SkillType.Shields]: {
    description: "Unlocks the use of medium and tower shields.",
    Icon,
    name: "Shieldcraft",
    price: 55,
    requiredLevel: 30,
  },
  [SkillType.Stagger]: {
    description: "Unlocks the ability to temporarily incapacitate the attacker.",
    Icon,
    name: "Traumatology",
    price: 45,
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

export const WEAPON_CLASS_SKILL_MAPPING = {
  [WeaponClass.Blunt]: SkillType.Stagger,
  [WeaponClass.Piercing]: SkillType.Bleed,
  [WeaponClass.Slashing]: SkillType.Parry,
};

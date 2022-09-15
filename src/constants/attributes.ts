// TODO - diversify icons.
import { ReactComponent as Icon } from "@neverquest/icons/abstract-049.svg";
import { Attribute } from "@neverquest/types";
import { AttributeType, SkillType } from "@neverquest/types/enums";

export const ATTRIBUTES: Record<AttributeType, Attribute> = {
  [AttributeType.AttackRate]: {
    base: 0,
    description: "Reduces attack rate",
    Icon,
    increment: 0.03,
    name: "Speed",
  },
  [AttributeType.BleedDamage]: {
    base: 0,
    description: "Increases bleed damage",
    Icon,
    increment: 0.05,
    name: "Cruelty",
    requiredSkill: SkillType.Bleed,
  },
  [AttributeType.CriticalChance]: {
    base: 0,
    description: "Increases critical hit chance",
    increment: 0.03,
    Icon,
    name: "Dexterity",
    requiredSkill: SkillType.Criticals,
  },
  [AttributeType.CriticalDamage]: {
    base: 1.5,
    description: "Increases critical hit damage",
    Icon,
    increment: 0.15,
    name: "Perception",
    requiredSkill: SkillType.Criticals,
  },
  [AttributeType.Damage]: {
    base: 0,
    description: "Increases base attack damage",
    Icon,
    increment: 1,
    name: "Strength",
  },
  [AttributeType.DodgeChance]: {
    base: 0,
    description: "Increases chance to dodge an attack",
    Icon,
    increment: 0.04,
    name: "Agility",
    requiredSkill: SkillType.Dodge,
  },
  [AttributeType.Health]: {
    base: 8,
    description: "Increases maximum health",
    Icon,
    increment: 4,
    name: "Vitality",
  },
  [AttributeType.HealthRegenerationRate]: {
    base: 8000,
    description: "Increases health regeneration rate",
    Icon,
    increment: -200,
    name: "Vigor",
    requiredSkill: SkillType.Regeneration,
  },
  [AttributeType.Loot]: {
    base: 0,
    description: "Increases amount of loot dropped by monsters",
    Icon,
    increment: 0.03,
    name: "Luck",
  },
  [AttributeType.ParryChance]: {
    base: 0,
    description: "Increases parry chance",
    Icon,
    increment: 0.02,
    name: "Finesse",
    requiredSkill: SkillType.Parry,
  },
  [AttributeType.RecoveryRate]: {
    base: 1500,
    description: "Reduces recovery rate",
    Icon,
    increment: -100,
    name: "Resilience",
  },
  [AttributeType.StaggerDuration]: {
    base: 0,
    description: "Increases stagger duration",
    Icon,
    increment: 50,
    name: "Might",
    requiredSkill: SkillType.Stagger,
  },
  [AttributeType.Stamina]: {
    base: 4,
    description: "Increases maximum stamina",
    Icon,
    increment: 2,
    name: "Endurance",
  },
  [AttributeType.StaminaRegenerationRate]: {
    base: 5500,
    description: "Increases stamina regeneration rate",
    Icon,
    increment: -150,
    name: "Fortitude",
    requiredSkill: SkillType.Regeneration,
  },
};

export const ATTRIBUTES_ORDER = [
  AttributeType.Health,
  AttributeType.HealthRegenerationRate,
  AttributeType.Stamina,
  AttributeType.StaminaRegenerationRate,
  AttributeType.Damage,
  AttributeType.AttackRate,
  AttributeType.RecoveryRate,
  AttributeType.CriticalChance,
  AttributeType.CriticalDamage,
  AttributeType.BleedDamage,
  AttributeType.DodgeChance,
  AttributeType.ParryChance,
  AttributeType.StaggerDuration,
  AttributeType.Loot,
];

export const ATTRIBUTES_INITIAL = [
  AttributeType.AttackRate,
  AttributeType.Damage,
  AttributeType.Health,
  AttributeType.RecoveryRate,
];

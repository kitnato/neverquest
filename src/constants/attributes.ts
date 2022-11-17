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
    maximum: 0.9,
    name: "Speed",
  },
  [AttributeType.BleedDamage]: {
    base: 0.1,
    description: "Increases bleed damage",
    Icon,
    increment: 0.04,
    name: "Cruelty",
    requiredSkill: SkillType.Bleed,
  },
  [AttributeType.CriticalChance]: {
    base: 0,
    description: "Increases critical strike chance",
    Icon,
    increment: 0.03,
    maximum: 0.6,
    name: "Dexterity",
    requiredSkill: SkillType.Criticals,
  },
  [AttributeType.CriticalDamage]: {
    base: 1.5,
    description: "Increases critical strike damage",
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
    maximum: 0.8,
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
    base: 6500,
    description: "Increases health regeneration rate",
    Icon,
    increment: -200,
    maximum: 1000,
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
  [AttributeType.ParryDamage]: {
    base: 0,
    description: "Increases damage absorbed and reflected when parrying",
    Icon,
    increment: 0.02,
    maximum: 0.5,
    name: "Finesse",
    requiredSkill: SkillType.Parry,
  },
  [AttributeType.RecoveryRate]: {
    base: 1500,
    description: "Reduces recovery rate",
    Icon,
    increment: -100,
    maximum: 100,
    name: "Resilience",
  },
  [AttributeType.StaggerDuration]: {
    base: 0,
    description: "Increases stagger duration",
    Icon,
    increment: 50,
    maximum: 2500,
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
    maximum: 500,
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
  AttributeType.ParryDamage,
  AttributeType.StaggerDuration,
  AttributeType.Loot,
];

export const ATTRIBUTES_INITIAL = [
  AttributeType.AttackRate,
  AttributeType.Damage,
  AttributeType.Health,
  AttributeType.RecoveryRate,
];

export const BLEED_DELTA = 500;

export const BLEED_DURATION = 2500;

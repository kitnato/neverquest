// TODO - diversify icons.
import { ReactComponent as Icon } from "@neverquest/icons/abstract-049.svg";
import { Attribute } from "@neverquest/types";
import { AttributeType } from "@neverquest/types/enums";

export const ATTRIBUTES: Record<AttributeType, Attribute> = {
  [AttributeType.AttackRateBonus]: {
    base: 0,
    description: "Reduces attack rate",
    Icon,
    increment: 0.03,
    name: "Speed",
  },
  [AttributeType.CriticalChance]: {
    base: 0,
    description: "Increases critical hit chance",
    increment: 0.03,
    Icon,
    name: "Dexterity",
  },
  [AttributeType.CriticalDamage]: {
    base: 1.5,
    description: "Increases critical hit damage",
    Icon,
    increment: 0.15,
    name: "Perception",
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
  },
  [AttributeType.Health]: {
    base: 8,
    description: "Increases maximum total health",
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
  },
  [AttributeType.LootBonus]: {
    base: 0,
    description: "Increases amount of loot dropped by monsters",
    Icon,
    increment: 0.03,
    name: "Luck",
  },
  [AttributeType.RecoveryRate]: {
    base: 1500,
    description: "Reduces recovery rate",
    Icon,
    increment: -100,
    name: "Resilience",
  },
  [AttributeType.Stamina]: {
    base: 4,
    description: "Increases maximum total stamina",
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
  },
};

export const ATTRIBUTES_ORDER = [
  AttributeType.Health,
  AttributeType.HealthRegenerationRate,
  AttributeType.Stamina,
  AttributeType.StaminaRegenerationRate,
  AttributeType.Damage,
  AttributeType.AttackRateBonus,
  AttributeType.CriticalChance,
  AttributeType.CriticalDamage,
  AttributeType.DodgeChance,
  AttributeType.RecoveryRate,
  AttributeType.LootBonus,
];

export const ATTRIBUTES_INITIAL = [
  AttributeType.AttackRateBonus,
  AttributeType.Damage,
  AttributeType.Health,
  AttributeType.RecoveryRate,
];

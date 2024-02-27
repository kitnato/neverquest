import { RESERVES } from "@neverquest/data/reserves";
import IconAgility from "@neverquest/icons/agility.svg?react";
import IconAttackRate from "@neverquest/icons/attack-rate.svg?react";
import IconCriticalChance from "@neverquest/icons/critical-chance.svg?react";
import IconCriticalDamage from "@neverquest/icons/critical-damage.svg?react";
import IconDamage from "@neverquest/icons/damage.svg?react";
import IconDexterity from "@neverquest/icons/dexterity.svg?react";
import IconDodgeChance from "@neverquest/icons/dodge-chance.svg?react";
import IconEndurance from "@neverquest/icons/endurance.svg?react";
import IconFortitude from "@neverquest/icons/fortitude.svg?react";
import IconHealth from "@neverquest/icons/health.svg?react";
import IconPerception from "@neverquest/icons/perception.svg?react";
import IconRegenerationAmount from "@neverquest/icons/regeneration-amount.svg?react";
import IconRegenerationRate from "@neverquest/icons/regeneration-rate.svg?react";
import IconSpeed from "@neverquest/icons/speed.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import IconStrength from "@neverquest/icons/strength.svg?react";
import IconVigor from "@neverquest/icons/vigor.svg?react";
import IconVitality from "@neverquest/icons/vitality.svg?react";
import type { AttributeOrMasteryBaseData } from "@neverquest/types";
import type { Attribute, Showing, Skill } from "@neverquest/types/unions";

export const ATTRIBUTE_COST_BASE = 2;

export const ATTRIBUTES: Record<
  Attribute,
  AttributeOrMasteryBaseData & {
    maximum?: number;
    powerBonus: number;
    rankBonus?: { increment: number; maximum: number };
    requiredSkill?: Skill;
    shows?: Showing;
  }
> = {
  agility: {
    base: 0.03,
    description: "Increases chance to # dodge an attack.",
    descriptionIcons: [IconDodgeChance],
    Icon: IconAgility,
    increment: 0.025,
    maximum: 0.95,
    powerBonus: 0.005,
    requiredSkill: "evasion",
  },
  dexterity: {
    base: 0.03,
    description: "Increases # critical strike chance.",
    descriptionIcons: [IconCriticalChance],
    Icon: IconDexterity,
    increment: 0.0066,
    maximum: 0.5,
    powerBonus: 0.0025,
    requiredSkill: "assassination",
  },
  endurance: {
    base: RESERVES.stamina.baseAmount,
    description: "Increases maximum # stamina.",
    descriptionIcons: [IconStamina],
    Icon: IconEndurance,
    increment: 5,
    powerBonus: 0.03,
    rankBonus: { increment: 5, maximum: 150 },
    shows: "stamina",
  },
  fortitude: {
    base: 0,
    description: "Increases health and stamina # regeneration amount.",
    descriptionIcons: [IconRegenerationAmount],
    Icon: IconFortitude,
    increment: 1,
    maximum: 120,
    powerBonus: 0.01,
    requiredSkill: "calisthenics",
  },
  perception: {
    base: 1.2,
    description: "Increases # critical strike damage.",
    descriptionIcons: [IconCriticalDamage],
    Icon: IconPerception,
    increment: 0.03,
    maximum: 2.5,
    powerBonus: 0.0005,
    requiredSkill: "assassination",
  },
  speed: {
    base: 0,
    description: "Reduces # attack rate.",
    descriptionIcons: [IconAttackRate],
    Icon: IconSpeed,
    increment: 0.015,
    maximum: 0.75,
    powerBonus: 0.001,
    shows: "attackRate",
  },
  strength: {
    base: 0,
    description: "Increases # damage.",
    descriptionIcons: [IconDamage],
    Icon: IconStrength,
    increment: 2,
    powerBonus: 0.01,
    rankBonus: { increment: 1, maximum: 30 },
    shows: "damage",
  },
  vigor: {
    base: 0,
    description: "Reduces health and stamina # regeneration rate.",
    descriptionIcons: [IconRegenerationRate],
    Icon: IconVigor,
    increment: 0.015,
    maximum: 0.85,
    powerBonus: 0.002,
    requiredSkill: "calisthenics",
  },
  vitality: {
    base: RESERVES.health.baseAmount,
    description: "Increases maximum # health.",
    descriptionIcons: [IconHealth],
    Icon: IconVitality,
    increment: 15,
    powerBonus: 0.025,
    rankBonus: { increment: 15, maximum: 300 },
    shows: "health",
  },
};

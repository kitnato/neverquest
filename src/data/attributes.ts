import { RESERVES } from "@neverquest/data/reserves";
import IconAgility from "@neverquest/icons/agility.svg?react";
import IconDexterity from "@neverquest/icons/dexterity.svg?react";
import IconEndurance from "@neverquest/icons/endurance.svg?react";
import IconFortitude from "@neverquest/icons/fortitude.svg?react";
import IconPerception from "@neverquest/icons/perception.svg?react";
import IconSpeed from "@neverquest/icons/speed.svg?react";
import IconStrength from "@neverquest/icons/strength.svg?react";
import IconVigor from "@neverquest/icons/vigor.svg?react";
import IconVitality from "@neverquest/icons/vitality.svg?react";
import type { AttributeOrMasteryBaseData } from "@neverquest/types";
import type { Attribute, Showing } from "@neverquest/types/unions";

export const ATTRIBUTE_COST_BASE = 2;

export const ATTRIBUTES: Record<
  Attribute,
  AttributeOrMasteryBaseData & {
    isUnlocked: boolean;
    maximum?: number;
    powerBonus: number;
    shows?: Showing[];
  }
> = {
  agility: {
    base: 0.03,
    description: "Increases chance to dodge an attack.",
    Icon: IconAgility,
    increment: 0.022,
    isUnlocked: false,
    maximum: 30, // 0.8
    powerBonus: 0.005,
  },
  dexterity: {
    base: 0.03,
    description: "Increases critical strike chance.",
    Icon: IconDexterity,
    increment: 0.0066,
    isUnlocked: false,
    maximum: 50, // 0.33
    powerBonus: 0.0025,
  },
  endurance: {
    base: RESERVES.stamina.baseAmount,
    description: "Increases maximum stamina.",
    Icon: IconEndurance,
    increment: 8,
    isUnlocked: true,
    powerBonus: 0.02,
    shows: ["stamina", "staminaDetails"],
  },
  fortitude: {
    base: 0,
    description: "Increases health & stamina regeneration amount.",
    Icon: IconFortitude,
    increment: 2,
    isUnlocked: false,
    maximum: 50,
    powerBonus: 0.01,
  },
  perception: {
    base: 1.2,
    description: "Increases critical strike damage.",
    Icon: IconPerception,
    increment: 0.03,
    isUnlocked: false,
    powerBonus: 0.002,
  },
  speed: {
    base: 0,
    description: "Reduces attack rate.",
    Icon: IconSpeed,
    increment: 0.015,
    isUnlocked: true,
    maximum: 50, // 0.75
    powerBonus: 0.001,
    shows: ["attackRateDetails"],
  },
  strength: {
    base: 0,
    description: "Increases damage.",
    Icon: IconStrength,
    increment: 2,
    isUnlocked: true,
    powerBonus: 0.01,
    shows: ["damageDetails"],
  },
  vigor: {
    base: 0,
    description: "Reduces health & stamina regeneration rate.",
    Icon: IconVigor,
    increment: 0.0225,
    isUnlocked: false,
    maximum: 40, // 0.9
    powerBonus: 0.002,
  },
  vitality: {
    base: RESERVES.health.baseAmount,
    description: "Increases maximum health.",
    Icon: IconVitality,
    increment: 15,
    isUnlocked: true,
    powerBonus: 0.01,
    shows: ["healthDetails"],
  },
};

import { RESERVES } from "@neverquest/data/reserves";
import { ReactComponent as IconAgility } from "@neverquest/icons/agility.svg";
import { ReactComponent as IconDexterity } from "@neverquest/icons/dexterity.svg";
import { ReactComponent as IconEndurance } from "@neverquest/icons/endurance.svg";
import { ReactComponent as IconFortitude } from "@neverquest/icons/fortitude.svg";
import { ReactComponent as IconLuck } from "@neverquest/icons/luck.svg";
import { ReactComponent as IconPerception } from "@neverquest/icons/perception.svg";
import { ReactComponent as IconSpeed } from "@neverquest/icons/speed.svg";
import { ReactComponent as IconStrength } from "@neverquest/icons/strength.svg";
import { ReactComponent as IconVigor } from "@neverquest/icons/vigor.svg";
import { ReactComponent as IconVitality } from "@neverquest/icons/vitality.svg";
import type { AttributeData } from "@neverquest/types";
import type { Attribute } from "@neverquest/types/unions";

export const ATTRIBUTES: Record<Attribute, AttributeData> = {
  agility: {
    base: 0,
    description: "Increases chance to dodge an attack.",
    Icon: IconAgility,
    increment: 0.04,
    isUnlocked: false,
    maximum: 0.8,
    powerBonus: 0.005,
  },
  dexterity: {
    base: 0,
    description: "Increases critical strike chance.",
    Icon: IconDexterity,
    increment: 0.03,
    isUnlocked: false,
    maximum: 0.6,
    powerBonus: 0.005,
  },
  endurance: {
    base: RESERVES.stamina.baseAmount,
    description: "Increases maximum stamina.",
    Icon: IconEndurance,
    increment: 5,
    isUnlocked: true,
    powerBonus: 0.01,
    shows: "staminaDetails",
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
  luck: {
    base: 0,
    description: "Increases amount of loot dropped by monsters.",
    Icon: IconLuck,
    increment: 0.03,
    isUnlocked: false,
    powerBonus: 0.01,
  },
  perception: {
    base: 1.5,
    description: "Increases critical strike damage.",
    Icon: IconPerception,
    increment: 0.15,
    isUnlocked: false,
    powerBonus: 0.003,
  },
  speed: {
    base: 0,
    description: "Reduces attack rate.",
    Icon: IconSpeed,
    increment: 0.03,
    isUnlocked: true,
    maximum: 0.9,
    powerBonus: 0.005,
    shows: "attackRateDetails",
  },
  strength: {
    base: 0,
    description: "Increases attack damage.",
    Icon: IconStrength,
    increment: 2,
    isUnlocked: true,
    powerBonus: 0.01,
    shows: "damageDetails",
  },
  vigor: {
    base: 0,
    description: "Reduces health & stamina regeneration rate.",
    Icon: IconVigor,
    increment: 0.05,
    isUnlocked: false,
    maximum: 0.9,
    powerBonus: 0.005,
  },
  vitality: {
    base: RESERVES.health.baseAmount,
    description: "Increases maximum health.",
    Icon: IconVitality,
    increment: 10,
    isUnlocked: true,
    powerBonus: 0.01,
    shows: "healthDetails",
  },
};

export const ATTRIBUTES_ORDER: Attribute[] = [
  "strength",
  "speed",
  "vitality",
  "endurance",
  "vigor",
  "fortitude",
  "dexterity",
  "perception",
  "agility",
  "luck",
];

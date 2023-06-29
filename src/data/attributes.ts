import { RESERVES } from "@neverquest/data/reserves";
import { RECOVERY_RATE } from "@neverquest/data/statistics";
import { ReactComponent as IconPlaceholder } from "@neverquest/icons/placeholder.svg";
import type { AttributeData } from "@neverquest/types";
import type { Attribute } from "@neverquest/types/unions";

// TODO - diversify icons.
export const ATTRIBUTES: Record<Attribute, AttributeData> = {
  agility: {
    base: 0,
    description: "Increases chance to dodge an attack.",
    Icon: IconPlaceholder,
    increment: 0.04,
    isUnlocked: false,
    maximum: 0.8,
    powerBonus: 0.005,
  },
  dexterity: {
    base: 0,
    description: "Increases critical strike chance.",
    Icon: IconPlaceholder,
    increment: 0.03,
    isUnlocked: false,
    maximum: 0.6,
    powerBonus: 0.005,
  },
  endurance: {
    base: RESERVES.stamina.baseAmount,
    description: "Increases maximum stamina.",
    Icon: IconPlaceholder,
    increment: 5,
    isUnlocked: true,
    powerBonus: 0.01,
    shows: "staminaDetails",
  },
  fortitude: {
    base: 0,
    description: "Increases health & stamina regeneration amount.",
    Icon: IconPlaceholder,
    increment: 2,
    isUnlocked: false,
    maximum: 50,
    powerBonus: 0.01,
  },
  luck: {
    base: 0,
    description: "Increases amount of loot dropped by monsters.",
    Icon: IconPlaceholder,
    increment: 0.03,
    isUnlocked: false,
    powerBonus: 0.01,
  },
  perception: {
    // TODO - move base amount to /data
    base: 1.5,
    description: "Increases critical strike damage.",
    Icon: IconPlaceholder,
    increment: 0.15,
    isUnlocked: false,
    powerBonus: 0.003,
  },
  resilience: {
    base: RECOVERY_RATE,
    description: "Increases recovery rate.",
    Icon: IconPlaceholder,
    increment: -150,
    isUnlocked: true,
    maximum: 150,
    powerBonus: 0.005,
    shows: "recoveryDetails",
  },
  speed: {
    base: 0,
    description: "Reduces attack rate.",
    Icon: IconPlaceholder,
    increment: 0.05,
    isUnlocked: true,
    maximum: 0.9,
    powerBonus: 0.005,
    shows: "attackRateDetails",
  },
  strength: {
    base: 0,
    description: "Increases damage.",
    Icon: IconPlaceholder,
    increment: 2,
    isUnlocked: true,
    powerBonus: 0.01,
    shows: "damageDetails",
  },
  vigor: {
    base: 0,
    description: "Reduces health & stamina regeneration rate.",
    Icon: IconPlaceholder,
    increment: 0.05,
    isUnlocked: false,
    maximum: 0.9,
    powerBonus: 0.005,
  },
  vitality: {
    base: RESERVES.health.baseAmount,
    description: "Increases maximum health.",
    Icon: IconPlaceholder,
    increment: 10,
    isUnlocked: true,
    powerBonus: 0.01,
    shows: "healthDetails",
  },
};

export const ATTRIBUTES_ORDER: Attribute[] = [
  "vitality",
  "endurance",
  "strength",
  "speed",
  "resilience",
  "vigor",
  "fortitude",
  "dexterity",
  "perception",
  "agility",
  "luck",
];

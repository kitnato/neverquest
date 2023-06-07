import { RECOVERY_RATE } from "@neverquest/data/statistics";
import { ReactComponent as IconPlaceholder } from "@neverquest/icons/placeholder.svg";
import type { AttributeOrMastery } from "@neverquest/types";
import type { Attribute } from "@neverquest/types/unions";

// TODO - diversify icons.
export const ATTRIBUTES: Record<Attribute, AttributeOrMastery> = {
  agility: {
    base: 0,
    description: "Increases chance to dodge an attack.",
    Icon: IconPlaceholder,
    increment: 0.04,
    isUnlocked: false,
    maximum: 0.8,
    name: "Agility",
  },
  dexterity: {
    base: 0,
    description: "Increases critical strike chance.",
    Icon: IconPlaceholder,
    increment: 0.03,
    isUnlocked: false,
    maximum: 0.6,
    name: "Dexterity",
  },
  endurance: {
    base: 10,
    description: "Increases maximum stamina.",
    Icon: IconPlaceholder,
    increment: 4,
    isUnlocked: true,
    name: "Endurance",
  },
  fortitude: {
    base: 0,
    description: "Increases health & stamina regeneration amount.",
    Icon: IconPlaceholder,
    increment: 1,
    isUnlocked: false,
    name: "Fortitude",
  },
  luck: {
    base: 0,
    description: "Increases amount of loot dropped by monsters.",
    Icon: IconPlaceholder,
    increment: 0.03,
    isUnlocked: false,
    name: "Luck",
  },
  perception: {
    base: 1.5,
    description: "Increases critical strike damage.",
    Icon: IconPlaceholder,
    increment: 0.15,
    isUnlocked: false,
    name: "Perception",
  },
  resilience: {
    base: RECOVERY_RATE,
    description: "Increases recovery rate.",
    Icon: IconPlaceholder,
    increment: -150,
    isUnlocked: true,
    maximum: 100,
    name: "Resilience",
  },
  speed: {
    base: 0,
    description: "Increases attack rate.",
    Icon: IconPlaceholder,
    increment: 0.05,
    isUnlocked: true,
    maximum: 0.9,
    name: "Speed",
  },
  strength: {
    base: 0,
    description: "Increases base attack damage.",
    Icon: IconPlaceholder,
    increment: 3,
    isUnlocked: true,
    name: "Strength",
  },
  vigor: {
    base: 0,
    description: "Increases health & stamina regeneration rate.",
    Icon: IconPlaceholder,
    increment: 0.05,
    isUnlocked: false,
    name: "Vigor",
  },
  vitality: {
    base: 100,
    description: "Increases maximum health.",
    Icon: IconPlaceholder,
    increment: 10,
    isUnlocked: true,
    name: "Vitality",
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

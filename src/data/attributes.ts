import { RECOVERY_RATE } from "@neverquest/data/statistics";
import { ReactComponent as IconPlaceholder } from "@neverquest/icons/placeholder.svg";
import type { AttributeOrMastery } from "@neverquest/types";
import { Attribute } from "@neverquest/types/enums";

// TODO - diversify icons.
export const ATTRIBUTES: Record<Attribute, AttributeOrMastery> = {
  [Attribute.Agility]: {
    base: 0,
    description: "Increases chance to dodge an attack.",
    Icon: IconPlaceholder,
    increment: 0.04,
    isUnlocked: false,
    maximum: 0.8,
    name: "Agility",
  },
  [Attribute.Dexterity]: {
    base: 0,
    description: "Increases critical strike chance.",
    Icon: IconPlaceholder,
    increment: 0.03,
    isUnlocked: false,
    maximum: 0.6,
    name: "Dexterity",
  },
  [Attribute.Endurance]: {
    base: 10,
    description: "Increases maximum stamina.",
    Icon: IconPlaceholder,
    increment: 4,
    isUnlocked: true,
    name: "Endurance",
  },
  [Attribute.Fortitude]: {
    base: 0,
    description: "Increases health & stamina regeneration amount.",
    Icon: IconPlaceholder,
    increment: 1,
    isUnlocked: false,
    name: "Fortitude",
  },
  [Attribute.Luck]: {
    base: 0,
    description: "Increases amount of loot dropped by monsters.",
    Icon: IconPlaceholder,
    increment: 0.03,
    isUnlocked: false,
    name: "Luck",
  },
  [Attribute.Perception]: {
    base: 1.5,
    description: "Increases critical strike damage.",
    Icon: IconPlaceholder,
    increment: 0.15,
    isUnlocked: false,
    name: "Perception",
  },
  [Attribute.Resilience]: {
    base: RECOVERY_RATE,
    description: "Increases recovery rate.",
    Icon: IconPlaceholder,
    increment: -150,
    isUnlocked: true,
    maximum: 100,
    name: "Resilience",
  },
  [Attribute.Speed]: {
    base: 0,
    description: "Increases attack rate.",
    Icon: IconPlaceholder,
    increment: 0.05,
    isUnlocked: true,
    maximum: 0.9,
    name: "Speed",
  },
  [Attribute.Strength]: {
    base: 0,
    description: "Increases base attack damage.",
    Icon: IconPlaceholder,
    increment: 3,
    isUnlocked: true,
    name: "Strength",
  },
  [Attribute.Vigor]: {
    base: 0,
    description: "Increases health & stamina regeneration rate.",
    Icon: IconPlaceholder,
    increment: 0.05,
    isUnlocked: false,
    name: "Vigor",
  },
  [Attribute.Vitality]: {
    base: 100,
    description: "Increases maximum health.",
    Icon: IconPlaceholder,
    increment: 10,
    isUnlocked: true,
    name: "Vitality",
  },
};

export const ATTRIBUTES_ORDER = [
  Attribute.Vitality,
  Attribute.Endurance,
  Attribute.Strength,
  Attribute.Speed,
  Attribute.Resilience,
  Attribute.Vigor,
  Attribute.Fortitude,
  Attribute.Dexterity,
  Attribute.Perception,
  Attribute.Agility,
  Attribute.Luck,
];

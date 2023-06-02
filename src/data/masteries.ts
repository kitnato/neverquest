import { ReactComponent as IconPlaceholder } from "@neverquest/icons/placeholder.svg";
import type { AttributeOrMastery } from "@neverquest/types";
import { Delta, Mastery } from "@neverquest/types/enums";

// TODO - diversify icons.
export const MASTERIES: Record<Mastery, AttributeOrMastery> = {
  [Mastery.Cruelty]: {
    base: 0.1,
    description: "Affects bleed damage. Trains when inflicting bleed.",
    Icon: IconPlaceholder,
    increment: 0.04,
    isUnlocked: false,
    maximum: 1,
    name: "Cruelty",
  },
  [Mastery.Finesse]: {
    base: 0,
    description: "Affects damage absorbed and reflected when parrying. Trains when parrying.",
    Icon: IconPlaceholder,
    increment: 0.02,
    isUnlocked: false,
    maximum: 0.8,
    name: "Finesse",
  },
  [Mastery.Stability]: {
    base: 0,
    description: "Chance that blocking consumes no stamina. Trains when blocking.",
    Icon: IconPlaceholder,
    increment: 0.03,
    isUnlocked: false,
    maximum: 0.66,
    name: "Stability",
  },
  [Mastery.Might]: {
    base: 1200,
    description: "Affects stagger duration. Trains when inflicting stagger.",
    Icon: IconPlaceholder,
    increment: 100,
    isUnlocked: false,
    maximum: 3500,
    name: "Might",
  },
  [Mastery.Tenacity]: {
    base: 0,
    description: "Chance to skip recovery when struck. Trains when struck.",
    Icon: IconPlaceholder,
    increment: 0.02,
    isUnlocked: false,
    maximum: 0.9,
    name: "Tenacity",
  },
};

export const MASTERIES_ORDER = [
  Mastery.Might,
  Mastery.Finesse,
  Mastery.Cruelty,
  Mastery.Tenacity,
  Mastery.Stability,
];

export const MASTERY_DELTA_TYPE: Record<Mastery, Delta> = {
  [Mastery.Cruelty]: Delta.Cruelty,
  [Mastery.Finesse]: Delta.Finesse,
  [Mastery.Might]: Delta.Might,
  [Mastery.Stability]: Delta.Stability,
  [Mastery.Tenacity]: Delta.Tenacity,
};

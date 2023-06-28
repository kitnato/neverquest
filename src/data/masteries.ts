import { ReactComponent as IconPlaceholder } from "@neverquest/icons/placeholder.svg";
import type { MasteryData } from "@neverquest/types";
import type { Mastery } from "@neverquest/types/unions";

// TODO - diversify icons.
export const MASTERIES: Record<Mastery, MasteryData> = {
  cruelty: {
    base: 0.1,
    description: "Affects bleed damage. Trains when inflicting bleed.",
    Icon: IconPlaceholder,
    increment: 0.04,
    isUnlocked: false,
    maximum: 1,
  },
  finesse: {
    base: 0,
    description: "Affects damage absorbed and reflected when parrying. Trains when parrying.",
    Icon: IconPlaceholder,
    increment: 0.02,
    isUnlocked: false,
    maximum: 0.8,
  },
  might: {
    base: 1200,
    description: "Affects stagger duration. Trains when inflicting stagger.",
    Icon: IconPlaceholder,
    increment: 100,
    isUnlocked: false,
    maximum: 3500,
  },
  stability: {
    base: 0,
    description: "Chance that blocking consumes no stamina. Trains when blocking.",
    Icon: IconPlaceholder,
    increment: 0.03,
    isUnlocked: false,
    maximum: 0.66,
  },
  tenacity: {
    base: 0,
    description: "Chance to skip recovery when struck. Trains when struck.",
    Icon: IconPlaceholder,
    increment: 0.02,
    isUnlocked: false,
    maximum: 0.9,
  },
};

export const MASTERIES_ORDER: Mastery[] = ["might", "finesse", "cruelty", "tenacity", "stability"];

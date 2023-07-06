import { ReactComponent as IconCruelty } from "@neverquest/icons/cruelty.svg";
import { ReactComponent as IconFinesse } from "@neverquest/icons/finesse.svg";
import { ReactComponent as IconMight } from "@neverquest/icons/might.svg";
import { ReactComponent as IconResilience } from "@neverquest/icons/resilience.svg";
import { ReactComponent as IconStability } from "@neverquest/icons/stability.svg";
import type { MasteryData } from "@neverquest/types";
import type { Mastery } from "@neverquest/types/unions";

export const MASTERIES: Record<Mastery, MasteryData> = {
  cruelty: {
    base: 0.1,
    description: "Increases bleed damage. Trains when inflicting bleed.",
    Icon: IconCruelty,
    increment: 0.04,
    isUnlocked: false,
    maximum: 1,
  },
  finesse: {
    base: 0,
    description: "Increases damage absorbed and reflected when parrying. Trains when parrying.",
    Icon: IconFinesse,
    increment: 0.02,
    isUnlocked: false,
    maximum: 0.8,
  },
  might: {
    base: 1200,
    description: "Increases stagger duration. Trains when inflicting stagger.",
    Icon: IconMight,
    increment: 100,
    isUnlocked: false,
    maximum: 3500,
  },
  resilience: {
    base: 0,
    description: "Reduces recovery rate. Trains when defending.",
    Icon: IconResilience,
    increment: 0.01,
    isUnlocked: false,
    maximum: 0.9,
  },
  stability: {
    base: 0,
    description: "Increases chance for 0-stamina blocks. Trains when blocking.",
    Icon: IconStability,
    increment: 0.03,
    isUnlocked: false,
    maximum: 0.66,
  },
};

export const MASTERIES_ORDER: Mastery[] = [
  "might",
  "finesse",
  "cruelty",
  "resilience",
  "stability",
];

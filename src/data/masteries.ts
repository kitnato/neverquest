import { ReactComponent as IconButchery } from "@neverquest/icons/butchery.svg";
import { ReactComponent as IconCruelty } from "@neverquest/icons/cruelty.svg";
import { ReactComponent as IconFinesse } from "@neverquest/icons/finesse.svg";
import { ReactComponent as IconMarksmanship } from "@neverquest/icons/marksmanship.svg";
import { ReactComponent as IconMight } from "@neverquest/icons/might.svg";
import { ReactComponent as IconResilience } from "@neverquest/icons/resilience.svg";
import { ReactComponent as IconStability } from "@neverquest/icons/stability.svg";
import type { AttributeOrMasteryBaseData } from "@neverquest/types";
import type { Mastery } from "@neverquest/types/unions";

export const MASTERIES: Record<
  Mastery,
  AttributeOrMasteryBaseData & {
    instructions: string;
    maximum: number;
  }
> = {
  butchery: {
    base: 0.15,
    description: "Determines monster health threshold for execution.",
    Icon: IconButchery,
    increment: 0.01,
    instructions: "Trains when dealing damage with a two-handed weapon.",
    isUnlocked: false,
    maximum: 0.33,
  },
  cruelty: {
    base: 0.2,
    description: "Determines bleed damage.",
    Icon: IconCruelty,
    increment: 0.02,
    instructions: "Trains when inflicting bleed.",
    isUnlocked: false,
    maximum: 1,
  },
  finesse: {
    base: 0,
    description: "Influences damage absorbed and reflected when parrying.",
    Icon: IconFinesse,
    increment: 0.02,
    instructions: "Trains when parrying.",
    isUnlocked: false,
    maximum: 0.9,
  },
  marksmanship: {
    base: 0,
    description: "Influences the distance a monster must close before it can attack.",
    Icon: IconMarksmanship,
    increment: 0.03,
    instructions: "Trains when dealing damage with a ranged weapon.",
    isUnlocked: false,
    maximum: 0.9,
  },
  might: {
    base: 1200,
    description: "Determines stagger duration.",
    Icon: IconMight,
    increment: 100,
    instructions: "Trains when inflicting stagger.",
    isUnlocked: false,
    maximum: 3500,
  },
  resilience: {
    base: 0,
    description: "Influences recovery rate.",
    Icon: IconResilience,
    increment: 0.01,
    instructions: "Trains when getting hit.",
    isUnlocked: false,
    maximum: 0.9,
  },
  stability: {
    base: 0,
    description: "Determines chance for 0-stamina blocks.",
    Icon: IconStability,
    increment: 0.03,
    instructions: "Trains when blocking.",
    isUnlocked: false,
    maximum: 0.66,
  },
};

export const MASTERY_PROGRESS = 1;

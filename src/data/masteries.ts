import IconButchery from "@neverquest/icons/butchery.svg?react";
import IconCruelty from "@neverquest/icons/cruelty.svg?react";
import IconFinesse from "@neverquest/icons/finesse.svg?react";
import IconMarksmanship from "@neverquest/icons/marksmanship.svg?react";
import IconMight from "@neverquest/icons/might.svg?react";
import IconResilience from "@neverquest/icons/resilience.svg?react";
import IconStability from "@neverquest/icons/stability.svg?react";
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
    maximum: 0.33,
  },
  cruelty: {
    base: 0.2,
    description: "Determines bleed damage.",
    Icon: IconCruelty,
    increment: 0.02,
    instructions: "Trains when dealing damage with a piercing weapon.",
    maximum: 1,
  },
  finesse: {
    base: 0,
    description: "Affects damage absorbed and reflected when parrying.",
    Icon: IconFinesse,
    increment: 0.02,
    instructions: "Trains when dealing damage with a slashing weapon.",
    maximum: 0.9,
  },
  marksmanship: {
    base: 0,
    description: "Affects the distance a monster must close before it can attack.",
    Icon: IconMarksmanship,
    increment: 0.03,
    instructions: "Trains when dealing damage with a ranged weapon.",
    maximum: 0.9,
  },
  might: {
    base: 3,
    description: "Affects stun length.",
    Icon: IconMight,
    increment: 1,
    instructions: "Trains when dealing damage with a blunt weapon.",
    maximum: 20,
  },
  resilience: {
    base: 0,
    description: "Affects recovery rate.",
    Icon: IconResilience,
    increment: 0.01,
    instructions: "Trains when getting hit.",
    maximum: 0.9,
  },
  stability: {
    base: 1500,
    description: "Affects stagger duration.",
    Icon: IconStability,
    increment: 100,
    instructions: "Trains when blocking.",
    maximum: 3500,
  },
};

export const MASTERY_COST_BASE = 4;

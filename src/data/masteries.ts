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
  }
> = {
  butchery: {
    base: 0.15,
    description: "Determines monster health threshold for execution.",
    Icon: IconButchery,
    increment: 0.002, // maximum: 0.35
    instructions: "Trains when dealing damage with a two-handed weapon.",
  },
  cruelty: {
    base: 0.2,
    description: "Determines bleed damage.",
    Icon: IconCruelty,
    increment: 0.0135, // maximum: 1.5
    instructions: "Trains when dealing damage with a piercing weapon.",
  },
  finesse: {
    base: 0,
    description: "Affects damage absorbed and reflected when parrying.",
    Icon: IconFinesse,
    increment: 0.009, // maximum: 0.9
    instructions: "Trains when dealing damage with a slashing weapon.",
  },
  marksmanship: {
    base: 0,
    description: "Affects the distance a monster must close before it can attack.",
    Icon: IconMarksmanship,
    increment: 0.01, // maximum: 1
    instructions: "Trains when dealing damage with a ranged weapon.",
  },
  // TODO
  might: {
    base: 3,
    description: "Affects stun length.",
    Icon: IconMight,
    increment: 1,
    instructions: "Trains when dealing damage with a blunt weapon.",
  },
  resilience: {
    base: 0,
    description: "Affects recovery rate.",
    Icon: IconResilience,
    increment: 0.01, // maximum: 1
    instructions: "Trains when getting hit.",
  },
  stability: {
    base: 1500,
    description: "Affects stagger duration.",
    Icon: IconStability,
    increment: 50, // maximum: 5500
    instructions: "Trains when blocking.",
  },
};

export const MASTERY_COST_BASE = 2;

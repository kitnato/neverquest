import { LEVELLING_MAXIMUM } from "@neverquest/data/general";
import IconButchery from "@neverquest/icons/butchery.svg?react";
import IconCruelty from "@neverquest/icons/cruelty.svg?react";
import IconFinesse from "@neverquest/icons/finesse.svg?react";
import IconMarksmanship from "@neverquest/icons/marksmanship.svg?react";
import IconMight from "@neverquest/icons/might.svg?react";
import IconResilience from "@neverquest/icons/resilience.svg?react";
import IconStability from "@neverquest/icons/stability.svg?react";
import type { AttributeOrMasteryBaseData } from "@neverquest/types";
import type { Mastery, Skill } from "@neverquest/types/unions";

export const MASTERIES: Record<
  Mastery,
  AttributeOrMasteryBaseData & {
    instructions: string;
    requiredSkill: Skill;
  }
> = {
  butchery: {
    base: 0.15,
    description: "Determines monster health threshold for execution.",
    Icon: IconButchery,
    increment: 0.35 / LEVELLING_MAXIMUM,
    instructions: "Trains when dealing damage with a two-handed weapon.",
    requiredSkill: "siegecraft",
  },
  cruelty: {
    base: 0.2,
    description: "Determines bleed damage.",
    Icon: IconCruelty,
    increment: 1.3 / LEVELLING_MAXIMUM,
    instructions: "Trains when dealing damage with a piercing weapon.",
    requiredSkill: "anatomy",
  },
  finesse: {
    base: 0,
    description: "Affects damage absorbed and reflected when parrying.",
    Icon: IconFinesse,
    increment: 0.9 / LEVELLING_MAXIMUM,
    instructions: "Trains when dealing damage with a slashing weapon.",
    requiredSkill: "escrime",
  },
  marksmanship: {
    base: 0,
    description: "Affects the distance a monster must close before it can attack.",
    Icon: IconMarksmanship,
    increment: 1 / LEVELLING_MAXIMUM,
    instructions: "Trains when dealing damage with a ranged weapon.",
    requiredSkill: "archery",
  },
  might: {
    base: 2000,
    description: "Affects stun length.",
    Icon: IconMight,
    increment: Math.round(5000 / LEVELLING_MAXIMUM),
    instructions: "Trains when dealing damage with a blunt weapon.",
    requiredSkill: "traumatology",
  },
  resilience: {
    base: 0,
    description: "Affects recovery rate.",
    Icon: IconResilience,
    increment: 1 / LEVELLING_MAXIMUM,
    instructions: "Trains when getting struck.",
    requiredSkill: "armorcraft",
  },
  stability: {
    base: 1500,
    description: "Affects stagger duration.",
    Icon: IconStability,
    increment: Math.round(4500 / LEVELLING_MAXIMUM),
    instructions: "Trains when getting struck while having a shield equipped.",
    requiredSkill: "shieldcraft",
  },
};

export const MASTERY_COST_BASE = 2;

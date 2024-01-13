import { LEVELLING_MAXIMUM } from "./general";
import { AILMENT_PENALTY } from "@neverquest/data/statistics";
import type { MonsterAilment } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export const AILMENT_DESCRIPTION: Record<MonsterAilment, string> = {
  bleeding: "Suffering periodic damage.",
  burning: "Cannot regenerate.",
  frozen: `Attack rate & movement speed slowed by ${formatNumber({
    decimals: 0,
    format: "percentage",
    value: AILMENT_PENALTY.frozen,
  })}.`,
  shocked: `Dealing ${formatNumber({
    decimals: 0,
    format: "percentage",
    value: 1 - AILMENT_PENALTY.shocked,
  })} decreased damage.`,
  staggered: `Taking ${formatNumber({
    decimals: 0,
    format: "percentage",
    value: AILMENT_PENALTY.staggered,
  })} increased damage.`,
  stunned: `Hit chance reduced to ${formatNumber({
    decimals: 0,
    format: "percentage",
    value: AILMENT_PENALTY.stunned,
  })}.`,
};

export const BOSS_STAGE_INTERVAL = 5;
export const BOSS_STAGE_START = 10;

export const BLIGHT = {
  boss: 1.2,
  chance: {
    maximum: 0.3,
    minimum: 0.075,
  },
  finality: {
    "res cogitans": 0.7777,
    "res dominus": 0.5777,
  },
  increment: 0.025,
  requiredStage: 55,
};

export const ESSENCE = {
  attenuation: 13,
  base: 5,
  bonus: 0.01,
  boss: 1.15,
  finality: {
    "res cogitans": 7777,
    "res dominus": 7777,
  },
};

export const FINALITY_STAGE = {
  "res cogitans": LEVELLING_MAXIMUM,
  "res dominus": 57,
};

export const FRAILTY = {
  familiar: 0.15,
  "mysterious egg": {
    maximum: 0.1,
    minimum: 0.01,
  },
};

export const MONSTER_ATTACK_RATE = {
  attenuation: 4000,
  base: 4100,
  bonus: 0.005,
  boss: 1.1,
  finality: {
    "res cogitans": 1765,
    "res dominus": 2765,
  },
  minimum: 1800,
};

export const MONSTER_DAMAGE = {
  attenuation: 14,
  base: 7,
  bonus: 0.005,
  boss: 1.15,
  finality: {
    "res cogitans": 3737,
    "res dominus": 1717,
  },
  menace: {
    maximum: 0.7,
    minimum: 0.15,
    requiredStage: 26,
  },
};

export const MONSTER_HEALTH = {
  attenuation: 23,
  base: 15,
  bonus: 0.0075,
  boss: 1.8,
  finality: {
    "res cogitans": 17_777,
    "res dominus": 7777,
  },
  menace: {
    maximum: 2,
    minimum: 0.2,
    requiredStage: 26,
  },
};

export const MONSTER_REGENERATION = {
  duration: 30_000,
  ticks: 20,
};

export const POISON = {
  boss: 1.25,
  chance: {
    maximum: 0.35,
    minimum: 0.05,
  },
  duration: {
    maximum: 250_000,
    minimum: 10_000,
  },
  finality: {
    "res cogitans": 0.7777,
    "res dominus": 0.4777,
  },
  magnitude: {
    maximum: 0.2,
    minimum: 0.02,
  },
  requiredStage: 45,
};

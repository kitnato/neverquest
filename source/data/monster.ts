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
  finality: 0.7777,
  increment: 0.025,
  requiredStage: 55,
};

export const ESSENCE = {
  attenuation: 9,
  base: 5,
  bonus: 0.02,
  boss: 1.15,
  finality: 7777,
};

export const MONSTER_ATTACK_RATE = {
  attenuation: 4000,
  base: 4100,
  bonus: 0.01,
  boss: 1.1,
  finality: 1765,
  minimum: 1800,
};

export const MONSTER_DAMAGE = {
  attenuation: 18,
  base: 5,
  bonus: 0.01,
  boss: 1.1,
  finality: 4747,
};

export const MONSTER_HEALTH = {
  attenuation: 30,
  base: 15,
  bonus: 0.01,
  boss: 1.8,
  finality: 17_777,
};

export const MONSTER_REGENERATION = {
  duration: 40_000,
  ticks: 30,
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
  finality: 0.5777,
  magnitude: {
    maximum: 0.16,
    minimum: 0.02,
  },
  requiredStage: 45,
};

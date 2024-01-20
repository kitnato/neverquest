import { LEVELLING_MAXIMUM } from "@neverquest/data/general";
import { AILMENT_PENALTY } from "@neverquest/data/statistics";
import IconDistance from "@neverquest/icons/distance.svg?react";
import IconMonsterAttackRate from "@neverquest/icons/monster-attack-rate.svg?react";
import IconMonsterDamage from "@neverquest/icons/monster-damage.svg?react";
import type { SVGIcon } from "@neverquest/types/components";
import type { Ailment } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export const AILMENT_DESCRIPTION: Record<
  Ailment,
  { description: string; descriptionIcons?: SVGIcon[] }
> = {
  bleeding: { description: "Suffering periodic damage." },
  burning: { description: "Cannot regenerate." },
  frozen: {
    description: `Attack # rate & # speed slowed by ${formatNumber({
      decimals: 0,
      format: "percentage",
      value: AILMENT_PENALTY.frozen,
    })}.`,
    descriptionIcons: [IconMonsterAttackRate, IconDistance],
  },
  shocked: {
    description: `Dealing ${formatNumber({
      decimals: 0,
      format: "percentage",
      value: AILMENT_PENALTY.shocked,
    })} decreased # damage.`,
    descriptionIcons: [IconMonsterDamage],
  },
  staggered: {
    description: `Taking ${formatNumber({
      decimals: 0,
      format: "percentage",
      value: AILMENT_PENALTY.staggered,
    })} increased damage.`,
  },
  stunned: {
    description: `Hit chance reduced to ${formatNumber({
      decimals: 0,
      format: "percentage",
      value: AILMENT_PENALTY.stunned,
    })}.`,
  },
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
  attenuation: 25,
  base: 7,
  bonus: 0.01,
  boss: 1.05,
  finality: {
    "res cogitans": 1777,
    "res dominus": 777,
  },
};

export const MONSTER_HEALTH = {
  attenuation: 16,
  base: 15,
  bonus: 0.02,
  boss: 1.8,
  finality: {
    "res cogitans": 7777,
    "res dominus": 5777,
  },
};

export const MONSTER_REGENERATION = {
  duration: 40_000,
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

export const RAGE = {
  effect: 0.5,
  increment: 1,
  maximum: 4,
  requiredStage: 21,
};

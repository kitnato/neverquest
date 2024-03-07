import { LEVELLING_MAXIMUM, RETIREMENT_STAGE } from "@neverquest/data/general";
import { AILMENT_PENALTY } from "@neverquest/data/statistics";
import IconDamage from "@neverquest/icons/damage.svg?react";
import IconDistance from "@neverquest/icons/distance.svg?react";
import IconMonsterAttackRate from "@neverquest/icons/monster-attack-rate.svg?react";
import IconMonsterDamage from "@neverquest/icons/monster-damage.svg?react";
import IconMonsterHealth from "@neverquest/icons/monster-health.svg?react";
import type { Description } from "@neverquest/types/ui";
import type { Ailment } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export const AILMENT_DESCRIPTION: Record<Ailment, Description> = {
  bleeding: { description: "Suffering periodic damage." },
  burning: { description: "Cannot regenerate # health.", descriptionIcons: [IconMonsterHealth] },
  frozen: {
    description: `Attack # rate and # speed slowed by ${formatNumber({
      decimals: 0,
      format: "percentage",
      value: AILMENT_PENALTY.frozen,
    })}.`,
    descriptionIcons: [IconMonsterAttackRate, IconDistance],
  },
  shocked: {
    description: `Taking ${formatNumber({
      decimals: 0,
      format: "percentage",
      value: AILMENT_PENALTY.shocked,
    })} increased # damage.`,
    descriptionIcons: [IconDamage],
  },
  staggered: {
    description: `Dealing ${formatNumber({
      decimals: 0,
      format: "percentage",
      value: AILMENT_PENALTY.staggered,
    })} decreased # damage.`,
    descriptionIcons: [IconMonsterDamage],
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
  requiredStage: 50,
};

export const ESSENCE = {
  attenuation: 17,
  base: 5,
  bonus: 0.03,
  boss: 1.5,
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
  familiar: 0.25,
  "mysterious egg": {
    maximum: 0.15,
    minimum: 0.01,
  },
};

export const MONSTER_ATTACK_RATE = {
  attenuation: 4000,
  base: 4100,
  bonus: 0.005,
  boss: 1.05,
  finality: {
    "res cogitans": 1765,
    "res dominus": 2765,
  },
  minimum: 2000,
};

export const MONSTER_DAMAGE = {
  attenuation: 27,
  base: 7,
  bonus: 0.01,
  boss: 1.05,
  finality: {
    "res cogitans": 2077,
    "res dominus": 1077,
  },
  menace: {
    maximum: 2,
    minimum: 0.3,
    requiredStage: RETIREMENT_STAGE + 1,
  },
};

export const MONSTER_HEALTH = {
  attenuation: 24,
  base: 18,
  bonus: 0.02,
  boss: 1.7,
  finality: {
    "res cogitans": 7777,
    "res dominus": 5777,
  },
  menace: {
    maximum: 4,
    minimum: 0.35,
    requiredStage: RETIREMENT_STAGE + 1,
  },
};

export const MONSTER_REGENERATION = {
  duration: 40_000,
  minimum: 1,
  ticks: 20,
};

export const POISON = {
  boss: 1.25,
  chance: {
    maximum: 0.5,
    minimum: 0.15,
  },
  duration: {
    maximum: 300_000,
    minimum: 30_000,
  },
  finality: {
    "res cogitans": 0.7777,
    "res dominus": 0.4777,
  },
  magnitude: {
    maximum: 0.25,
    minimum: 0.075,
  },
  requiredStage: 45,
};

export const RAGE = {
  effect: 0.5,
  increment: 1,
  maximum: 4,
  requiredStage: 21,
};

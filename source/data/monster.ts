import { CREW } from "@neverquest/data/caravan";
import { AILMENT_PENALTY } from "@neverquest/data/statistics";
import type { MonsterAilment } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export const AILMENT_DESCRIPTION: Record<MonsterAilment, string> = {
  bleeding: "Suffering periodic damage.",
  burning: "Cannot regenerate.",
  frozen: `Attack rate & movement speed slowed to ${formatNumber({
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
    maximum: 0.25,
    minimum: 0.075,
  },
  finality: 0.7777,
  increment: 0.025,
  requiredStage: CREW.witch.requiredStage + 5,
};

export const ESSENCE = {
  attenuation: 10,
  base: 5,
  bonus: 0.02,
  boss: 1.5,
  finality: 7777,
};

export const MONSTER_ATTACK_RATE = {
  base: 3700,
  bonus: 0.01,
  boss: 1.1,
  finality: 770,
  minimum: 1200,
};

export const MONSTER_DAMAGE = {
  attenuation: 37,
  base: 7,
  bonus: 0.02,
  boss: 1.2,
  finality: 1777,
};

export const MONSTER_HEALTH = {
  attenuation: 35,
  base: 20,
  bonus: 0.03,
  boss: 1.85,
  finality: 7777,
};

export const POISON = {
  boss: 1.25,
  chance: {
    maximum: 0.33,
    minimum: 0.1,
  },
  duration: {
    maximum: 250_000,
    minimum: 10_000,
  },
  finality: 0.7777,
  magnitude: {
    maximum: 0.15,
    minimum: 0.03,
  },
  requiredStage: CREW.witch.requiredStage,
};

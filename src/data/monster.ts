import { AILMENT_PENALTY } from "@neverquest/data/statistics";
import type { MonsterAilment } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export const AILMENT_DESCRIPTION: Record<MonsterAilment, string> = {
  bleeding: "Suffering periodic damage.",
  burning: `Taking ${formatNumber({
    format: "percentage",
    value: 1 - AILMENT_PENALTY.burning,
  })} increased damage.`,
  frozen: "Cannot attack or move.",
  shocked: `Dealing ${formatNumber({
    format: "percentage",
    value: 1 - AILMENT_PENALTY.shocked,
  })} decreased damage.`,
  staggered: `Attack rate & movement speed slowed by ${formatNumber({
    format: "percentage",
    value: 1 - AILMENT_PENALTY.staggered,
  })}.`,
  stunned: `Hit accuracy reduced to ${formatNumber({
    format: "percentage",
    value: AILMENT_PENALTY.stunned,
  })}.`,
};

export const BOSS_STAGE_INTERVAL = 5;
export const BOSS_STAGE_START = 10;

export const BLIGHT = {
  boss: 1.33,
  chance: {
    maximum: 0.6,
    minimum: 0.1,
  },
  increment: 0.075,
  stageRequired: 20,
};

export const ESSENCE = {
  attenuation: 10,
  base: 5,
  bonus: 0.02,
  boss: 1.5,
};

export const MONSTER_ATTACK_RATE = {
  base: 4000,
  bonus: 0.01,
  boss: 1.15,
  minimum: 666,
};

export const MONSTER_DAMAGE = {
  attenuation: 40,
  base: 6,
  bonus: 0.02,
  boss: 1.3,
};

export const MONSTER_HEALTH = {
  attenuation: 50,
  base: 25,
  bonus: 0.03,
  boss: 1.8,
};

export const POISON = {
  boss: 1.33,
  chance: {
    maximum: 0.5,
    minimum: 0.1,
  },
  duration: {
    maximum: 250000,
    minimum: 20000,
  },
  magnitude: {
    maximum: 0.25,
    minimum: 0.05,
  },
  stageRequired: 18,
};

import { AILMENT_PENALTY } from "@neverquest/data/statistics";
import type { MonsterAilment } from "@neverquest/types/unions";
import { formatValue } from "@neverquest/utilities/formatters";

export const AILMENT_DESCRIPTION: Record<MonsterAilment, string> = {
  bleeding: "Suffering periodic damage.",
  burning: `Taking ${formatValue({
    format: "percentage",
    value: 1 - AILMENT_PENALTY.burning,
  })} increased damage.`,
  frozen: `Attack rate & movement speed slowed by ${formatValue({
    format: "percentage",
    value: 1 - AILMENT_PENALTY.frozen,
  })}.`,
  shocked: `Dealing ${formatValue({
    format: "percentage",
    value: 1 - AILMENT_PENALTY.shocked,
  })} decreased damage.`,
  staggered: "Cannot attack.",
  stunned: `Hit accuracy reduced to ${formatValue({
    format: "percentage",
    value: AILMENT_PENALTY.stunned,
  })}.`,
};

export const BOSS_STAGE_INTERVAL = 5;
export const BOSS_STAGE_START = 10;

export const BLIGHT = {
  boss: 0.33,
  chance: {
    maximum: 0.6,
    minimum: 0.1,
  },
  increment: 0.075,
  stageRequired: 20,
};

export const ESSENCE = {
  attenuation: 10,
  bonus: 0.02,
  boss: 0.2,
  essence: 4,
};

export const MONSTER_ATTACK_RATE = {
  base: 4000,
  bonus: 0.01,
  boss: 1.1,
  minimum: 666,
};

export const MONSTER_DAMAGE = {
  attenuation: 40,
  base: 8,
  bonus: 0.02,
  boss: 1.2,
};

export const MONSTER_HEALTH = {
  attenuation: 80,
  base: 25,
  bonus: 0.03,
  boss: 1.7,
};

export const MONSTER_NAME = {
  prefix: { maximum: 1, minimum: 0.75 },
  suffix: { maximum: 0.6, minimum: 0.01 },
};

export const POISON = {
  boss: 0.33,
  chance: {
    maximum: 0.5,
    minimum: 0.1,
  },
  duration: {
    maximum: 200000,
    minimum: 20000,
  },
  magnitude: {
    maximum: 0.2,
    minimum: 0.05,
  },
  stageRequired: 15,
};

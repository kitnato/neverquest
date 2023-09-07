import type { MonsterAilment } from "@neverquest/types/unions";

export const AILMENT_DESCRIPTION: Record<MonsterAilment, string> = {
  bleeding: "Suffering periodic damage.",
  burning: "Taking increased damage.",
  frozen: "Attack rate & movement speed slowed.",
  shocked: "Dealing decreased damage",
  staggered: "Cannot attack.",
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

export const LOOT = {
  bonus: 0.03,
  boss: 1.2,
  coins: 250,
  essence: 2000,
  scrap: 500,
};

export const MONSTER_ATTACK_RATE = {
  bonus: 0.01,
  boss: 1.1,
  maximum: 4000,
  minimum: 1500,
};

export const MONSTER_DAMAGE = {
  bonus: 0.02,
  boss: 1.25,
  maximum: 1000,
  minimum: 8,
};

export const MONSTER_HEALTH = {
  bonus: 0.03,
  boss: 1.75,
  maximum: 3000,
  minimum: 25,
};

export const MONSTER_NAME = {
  prefix: { maximum: 1, minimum: 0.5 },
  suffix: { maximum: 0.7, minimum: 0.01 },
};

export const MONSTER_POWER_SCALAR = 2500;

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

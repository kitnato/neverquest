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
  bonus: 50,
  boss: 1.5,
  coins: 250,
  essence: 400,
  scrap: 200,
};

export const MONSTER_ATTACK_RATE = {
  bonus: 100,
  boss: 0.1,
  maximum: 4000,
  minimum: 1500,
};

export const MONSTER_DAMAGE = {
  bonus: 100,
  boss: 0.3,
  maximum: 1100,
  minimum: 10,
};

export const MONSTER_HEALTH = {
  bonus: 500,
  boss: 2,
  maximum: 4500,
  minimum: 12,
};

export const MONSTER_NAME = {
  prefix: { maximum: 1, minimum: 0.5 },
  suffix: { maximum: 0.7, minimum: 0.01 },
};

export const MONSTER_POWER_SCALAR = 5000;

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

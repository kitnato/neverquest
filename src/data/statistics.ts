export const AILMENT_PENALTY = {
  burning: 1.25,
  // attack rate & speed slowed by half
  shocked: 0.75,
  // damage taken increased by 25%
  staggered: 0.5, // damage dealt reduced by 25%
  stunned: 0.6, // hit chance reduced by 40%
};

export const BLEED = {
  default: { duration: 5000, ticks: 250 },
  shredder: { duration: 100, ticks: 1 },
};

export const ELEMENTAL_AILMENT_DURATION_MAXIMUM = 5000;

export const LOOTING_RATE = 2000;

export const PARRY_ABSORPTION = 0.33;
export const PARRY_DAMAGE = 0.25;

export const RECOVERY_RATE = 1500;

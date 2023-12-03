import type { GeneratorRange } from "@neverquest/types";
import type { Elemental, MonsterAilmentElemental } from "@neverquest/types/unions";

export const AILMENT_PENALTY = {
  frozen: 0.4,
  shocked: 0.75,
  staggered: 1.25,
  stunned: 0.5,
};

export const BLEED = {
  default: { duration: 5000, ticks: 40 },
  shredder: { duration: 100, ticks: 1 },
};

export const ELEMENTAL_AILMENT_DURATION_CAP: Record<MonsterAilmentElemental, number> = {
  burning: 15_000,
  frozen: 4000,
  shocked: 7000,
};
export const ELEMENTAL_DURATION: Record<Elemental, GeneratorRange> = {
  fire: { maximum: 7000, minimum: 3000 },
  ice: { maximum: 2000, minimum: 750 },
  lightning: { maximum: 3000, minimum: 1500 },
};

export const LOOTING_RATE = 2000;

export const PARRY_ABSORPTION = 0.33;
export const PARRY_DAMAGE = 0.25;

export const RECOVERY_RATE = 1500;

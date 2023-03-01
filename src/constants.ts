import { DeltaDisplay } from "@neverquest/types/ui";

export const BLEED = {
  duration: 3000,
  ticks: 10,
} as const;

export const CLASS_ANIMATE_PREFIX = "animate__";

export const CLASS_ANIMATED = `${CLASS_ANIMATE_PREFIX}animated`;

export const CLASS_FULL_WIDTH_JUSTIFIED = "align-items-center d-flex justify-content-between w-100";

export const CLASS_TABLE_CELL_ITALIC = "fst-italic text-end";

export const DEFAULT_DELTA_DISPLAY: DeltaDisplay = {
  color: null,
  value: "",
};

export const ICON_INLAY_SIZE = 16;

const KEY_STORAGE_PREFIX = "nq";

export const KEY_SESSION = `${KEY_STORAGE_PREFIX}-ss`;

export const KEY_SETTINGS = `${KEY_STORAGE_PREFIX}-st`;

export const LABEL_AT_MAXIMUM = "MAX";

export const LABEL_UNKNOWN = "???";

export const POISON = {
  blightChance: 0.1,
  blightEffect: 0.1,
  chanceBase: 0.05,
  chanceIncrement: 0.01,
  damage: 0.33,
  duration: 15000,
  minimumLevel: 11,
  ticks: 10,
} as const;

export const RECOVERY_RATE = 1500;

export const REGENERATION_AMOUNT_HEALTH = 4;

export const REGENERATION_RATE_HEALTH = 6000;

export const REGENERATION_AMOUNT_STAMINA = 2;

export const REGENERATION_RATE_STAMINA = 5000;

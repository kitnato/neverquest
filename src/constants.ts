import { DeltaDisplay } from "@neverquest/types/ui";

export const BLEED = {
  duration: 3000,
  ticks: 10,
};

export const CLASS_ANIMATE_PREFIX = "animate__";

export const CLASS_ANIMATED = `${CLASS_ANIMATE_PREFIX}animated`;

export const CLASS_FULL_WIDTH_JUSTIFIED = "align-items-center d-flex justify-content-between w-100";

export const CLASS_TABLE_CELL_ITALIC = "fst-italic text-end";

export const DEFAULT_DELTA_DISPLAY: DeltaDisplay = {
  color: null,
  value: "",
};

export const EXCHANGE_COINS = 1;

export const EXCHANGE_SCRAP = 3;

export const ICON_INLAY_SIZE = 16;

const KEY_STORAGE_PREFIX = "nq";

export const KEY_SESSION = `${KEY_STORAGE_PREFIX}-ss`;

export const KEY_SETTINGS = `${KEY_STORAGE_PREFIX}-st`;

export const LABEL_AT_MAXIMUM = "MAX";

export const LABEL_UNKNOWN = "???";

export const POISON = {
  chanceBase: 0.05,
  chanceIncrement: 0.01,
  damage: 0.33,
  duration: 5000,
  minimumLevel: 11,
  ticks: 10,
};

export const REGENERATION_RATE_HEALTH = 6000;

export const REGENERATION_RATE_STAMINA = 5000;
import { DeltaDisplay, DeltaReserve } from "@neverquest/types/ui";

export const BLEED_DELTA = 500;

export const BLEED_DURATION = 2500;

export const CLASS_ANIMATE_PREFIX = "animate__";

export const CLASS_ANIMATED = `${CLASS_ANIMATE_PREFIX}animated`;

export const CLASS_FULL_WIDTH_JUSTIFIED = "align-items-center d-flex justify-content-between w-100";

export const CLASS_TABLE_CELL_ITALIC = "fst-italic text-end";

export const DEFAULT_DELTA_DISPLAY: DeltaDisplay = {
  color: null,
  value: "",
};

export const DEFAULT_RESERVE_CHANGE: DeltaReserve = {
  value: 0,
};

export const EXCHANGE_COINS = 1;

export const EXCHANGE_SCRAP = 3;

export const ICON_INLAY_SIZE = 16;

const KEY_STORAGE_PREFIX = "nq";

export const KEY_SESSION = `${KEY_STORAGE_PREFIX}-ss`;

export const KEY_SETTINGS = `${KEY_STORAGE_PREFIX}-st`;

export const UNKNOWN = "???";

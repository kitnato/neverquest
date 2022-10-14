import { DeltaDisplay, DeltaReserve } from "@neverquest/types/ui";

export const CLASS_ANIMATE_PREFIX = "animate__";

export const CLASS_ANIMATED = `${CLASS_ANIMATE_PREFIX}animated`;

export const CLASS_TABLE_CELL_ITALIC = "fst-italic text-end";

export const DEFAULT_DELTA_DISPLAY: DeltaDisplay = {
  color: null,
  value: "",
};

export const DEFAULT_RESERVE_CHANGE: DeltaReserve = {
  value: 0,
};

const KEY_STORAGE_PREFIX = "nq";

export const KEY_SESSION = `${KEY_STORAGE_PREFIX}-session`;

export const KEY_SETTINGS = `${KEY_STORAGE_PREFIX}-settings`;

export const UNKNOWN = "???";

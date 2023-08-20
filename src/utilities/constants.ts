import type { DeltaDisplay } from "@neverquest/types/ui";

export const CLASS_ANIMATE_PREFIX = "animate__";
export const CLASS_ANIMATED = `${CLASS_ANIMATE_PREFIX}animated`;
export const CLASS_FULL_WIDTH_JUSTIFIED = "align-items-center d-flex justify-content-between w-100";
export const CLASS_TABLE_CELL_ITALIC = "fst-italic text-end";

export const DEFAULT_DELTA_DISPLAY: DeltaDisplay = {
  color: null,
  value: "",
};

const KEY_STORAGE_PREFIX = "neverquest";
export const KEY_SESSION = `${KEY_STORAGE_PREFIX}-session`;
export const KEY_SETTINGS = `${KEY_STORAGE_PREFIX}-settings`;

export const LABEL_AT_MAXIMUM = "MAX";
export const LABEL_EMPTY = "--";
export const LABEL_UNKNOWN = "???";

import type { DeltaDisplay } from "@neverquest/types/ui";

export const CLASS_ANIMATE_PREFIX = "animate__";
export const CLASS_ANIMATED = `${CLASS_ANIMATE_PREFIX}animated`;
export const CLASS_FULL_WIDTH_JUSTIFIED = "align-items-center d-flex justify-content-between w-100";
export const CLASS_TABLE_CELL_ITALIC = "fst-italic text-end";

export const DEFAULT_DELTA_DISPLAY: DeltaDisplay = {
  color: null,
  value: "",
};

export const FRAMERATE = 1000 / 60;

export const GROWTH_MAXIMUM = 100;

const KEY_STORAGE_PREFIX = "neverquest";
export const KEY_SESSION = `${KEY_STORAGE_PREFIX}-session`;
export const KEY_SETTINGS = `${KEY_STORAGE_PREFIX}-settings`;

export const INFUSION_DELTA = FRAMERATE * 3;
export const INFUSION_DURATION = 2500;

export const LABEL_EMPTY = "--";
export const LABEL_FULL_HEALTH = "Already at full health.";
export const LABEL_MAXIMUM = "MAX";
export const LABEL_NO_ESSENCE = "Insufficient essence.";
export const LABEL_NONE = "None.";
export const LABEL_OVER_ENCUMBERED = "Too heavy.";
export const LABEL_SEPARATOR = "·";
export const LABEL_UNKNOWN = "???";

export const MILLISECONDS_IN_HOUR = 3600000;
export const MILLISECONDS_IN_MINUTE = 60000;
export const MILLISECONDS_IN_SECOND = 1000;

export const QUEST_NOTIFICATION_DURATION = 5000;

export const RETIREMENT_MINIMUM_LEVEL = 50;

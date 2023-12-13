export const CLASS_ANIMATE_PREFIX = "animate__";
export const CLASS_ANIMATED = `${CLASS_ANIMATE_PREFIX}animated`;
export const CLASS_FULL_WIDTH_JUSTIFIED = "align-items-center d-flex justify-content-between w-100";
export const CLASS_TABLE_CELL_ITALIC = "fst-italic text-end";

export const MILLISECONDS_IN_HOUR = 3_600_000;
export const MILLISECONDS_IN_MINUTE = 60_000;
export const MILLISECONDS_IN_SECOND = 1000;

export const FRAMERATE = MILLISECONDS_IN_SECOND / 60;

export const GLITCH_NUMBER = "7";

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
export const LABEL_NONE_AVAILABLE = "None available.";
export const LABEL_OVER_ENCUMBERED = "Too heavy.";
export const LABEL_SEPARATOR = "·";
export const LABEL_UNKNOWN = "???";

export const LEVELLING_MAXIMUM = 77;

export const PERCENTAGE_POINTS = 100;

export const QUEST_NOTIFICATION_DURATION = 5000;

export const RETIREMENT_STAGE_MINIMUM = 40;

export const ROMAN_NUMERAL_MAXIMUM = 3999;
export const ROMAN_NUMERALS = [
  ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"], // 1-9
  ["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"], // 10-90
  ["C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"], // 100-900
  ["M", "MM", "MMM"], // 1000-3000
] as const;

export const SCREEN_WIDTH_MINIMUM = 1200;

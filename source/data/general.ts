import type { OverlayTriggerType } from "react-bootstrap/esm/OverlayTrigger";

export const ACCORDION_EVENT_KEY = "0";

export const CLASS_ANIMATE_PREFIX = "animate__";
export const CLASS_ANIMATED = `${CLASS_ANIMATE_PREFIX}animated`;
export const CLASS_FULL_WIDTH_JUSTIFIED = "align-items-center d-flex justify-content-between w-100";

export const MILLISECONDS_IN_HOUR = 3_600_000;
export const MILLISECONDS_IN_MINUTE = 60_000;
export const MILLISECONDS_IN_SECOND = 1000;

export const FRAMERATE = MILLISECONDS_IN_SECOND / 60;

export const GLITCH_NUMBER = 7;
export const GLITCH_STAGE_MINIMUM = 57;

export const KEY_SESSION = "neverquest-session";

export const LABEL_EMPTY = "--";
export const LABEL_FULL_HEALTH = "Already at full health.";
export const LABEL_MAXIMUM = "MAX";
export const LABEL_NO_ESSENCE = "Insufficient essence.";
export const LABEL_NONE = "None.";
export const LABEL_NONE_AVAILABLE = "None available.";
export const LABEL_NO_PENALTY = "No penalty.";
export const LABEL_OVER_ENCUMBERED = "Too heavy.";
export const LABEL_SEPARATOR = "·";
export const LABEL_SKILL_REQUIRED = "Requires a skill.";
export const LABEL_UNKNOWN = "???";

export const LEVELLING_CUTOFF = 100;
export const LEVELLING_MAXIMUM = 77;

export const NAME_LENGTH_MAXIMUM = 50;

export const PERCENTAGE_POINTS = 100;

export const POPOVER_TRIGGER: OverlayTriggerType[] = ["focus", "hover"];

export const RETIREMENT_STAGE = 35;

export const ROMAN_NUMERAL_MAXIMUM = 3999;
export const ROMAN_NUMERALS = [
  ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"], // 1-9
  ["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"], // 10-90
  ["C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"], // 100-900
  ["M", "MM", "MMM"], // 1000-3000
] as const;

export const SCREEN_WIDTH_MINIMUM = 1200;

import type { AffixStructure } from "@kitnato/locran/build/types"
import type { OverlayTriggerType } from "react-bootstrap/esm/OverlayTrigger"

export const ACCORDION_EVENT_KEY = "0"

export const AFFIX_STRUCTURE_WEIGHTS: [AffixStructure, number][] = [
	["noAffix", 0.025],
	["prefixAndSuffix", 0.075],
	["suffix", 0.25],
	["prefix", 0.65],
]

export const CLASS_ANIMATE_PREFIX = "animate__"
export const CLASS_ANIMATED = `${CLASS_ANIMATE_PREFIX}animated`
export const CLASS_FULL_WIDTH_JUSTIFIED = "align-items-center d-flex justify-content-between w-100"

export const MILLISECONDS_IN_HOUR = 3_600_000
export const MILLISECONDS_IN_MINUTE = 60_000
export const MILLISECONDS_IN_SECOND = 1000

export const FILE_EXTENSION = "nq"

export const FRAMERATE = MILLISECONDS_IN_SECOND / 60

export const GENERIC_MINIMUM = 1

export const KEY_SESSION = "neverquest-session"

export const LABEL_EMPTY = "--"
export const LABEL_FULL_HEALTH = "Already at full health."
export const LABEL_NO_ESSENCE = "Insufficient essence."
export const LABEL_NONE = "None."
export const LABEL_NONE_AVAILABLE = "None available."
export const LABEL_OVER_ENCUMBERED = "Too heavy."
export const LABEL_SEPARATOR = "·"
export const LABEL_SKILL_REQUIRED = "Requires a skill."
export const LABEL_TOTAL = "total"
export const LABEL_UNKNOWN = "???"

export const LEVELLING_END = 100
export const LEVELLING_MAXIMUM = 75

export const NAME_LENGTH_MAXIMUM = 50

export const NUMBER_FORMAT = {
	formatter: /\.0+$|(?<=\.[0-9]*[1-9])0+$/,
	mapping: [
		{ symbol: "", threshold: 1 },
		{ symbol: "k", threshold: 1e3 },
		{ symbol: "M", threshold: 1e6 },
		{ symbol: "G", threshold: 1e9 },
		{ symbol: "T", threshold: 1e12 },
		{ symbol: "P", threshold: 1e15 },
		{ symbol: "E", threshold: 1e18 },
	],
}

export const ORDINALS = new Intl.PluralRules("en", { type: "ordinal" })

export const PERCENTAGE = 100

export const POPOVER_TRIGGER: OverlayTriggerType[] = ["focus", "hover"]

export const ROMAN_NUMERAL_MAXIMUM = 3999
export const ROMAN_NUMERALS = [
	["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"], // 1-9
	["X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"], // 10-90
	["C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"], // 100-900
	["M", "MM", "MMM"], // 1000-3000
] as const

export const SCREEN_WIDTH_MINIMUM = 1200

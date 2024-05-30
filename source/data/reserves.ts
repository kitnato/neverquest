import IconHealth from "@neverquest/icons/health.svg?react"
import IconStamina from "@neverquest/icons/stamina.svg?react"

import type { SVGIcon } from "@neverquest/types/components"
import type { Attribute, Delta, Reserve } from "@neverquest/types/unions"

export const HEALTH_LOW_THRESHOLD = 0.25

export const REGENERATION_METER_ANIMATION_THRESHOLD = 300

export const RESERVES: Record<
	Reserve,
	{
		attribute: Attribute
		baseAmount: number
		baseRegenerationRate: number
		Icon: SVGIcon
		maximumDelta: Delta
		regeneration: number
		regenerationRateDelta: Delta
	}
> = {
	health: {
		attribute: "vitality",
		baseAmount: 50,
		baseRegenerationRate: 3300,
		Icon: IconHealth,
		maximumDelta: "healthMaximum",
		regeneration: 0.03,
		regenerationRateDelta: "healthRegenerationRate",
	},
	stamina: {
		attribute: "endurance",
		baseAmount: 30,
		baseRegenerationRate: 2500,
		Icon: IconStamina,
		maximumDelta: "staminaMaximum",
		regeneration: 0.02,
		regenerationRateDelta: "staminaRegenerationRate",
	},
}

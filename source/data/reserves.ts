import IconHealthRegeneration from "@neverquest/icons/health-regeneration.svg?react"
import IconHealth from "@neverquest/icons/health.svg?react"
import IconStaminaRegeneration from "@neverquest/icons/stamina-regeneration.svg?react"
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
		IconRegeneration: SVGIcon
		maximumDelta: Delta
		regeneration: number
		regenerationAttribute: Attribute
		regenerationRateDelta: Delta
	}
> = {
	health: {
		attribute: "vitality",
		baseAmount: 80,
		baseRegenerationRate: 2700,
		Icon: IconHealth,
		IconRegeneration: IconHealthRegeneration,
		maximumDelta: "healthMaximum",
		regeneration: 0.03,
		regenerationAttribute: "fortitude",
		regenerationRateDelta: "healthRegenerationRate",
	},
	stamina: {
		attribute: "endurance",
		baseAmount: 25,
		baseRegenerationRate: 2000,
		Icon: IconStamina,
		IconRegeneration: IconStaminaRegeneration,
		maximumDelta: "staminaMaximum",
		regeneration: 0.01,
		regenerationAttribute: "vigor",
		regenerationRateDelta: "staminaRegenerationRate",
	},
}

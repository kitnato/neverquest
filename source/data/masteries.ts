import { LEVELLING_MAXIMUM } from "@neverquest/data/general"
import IconBleeding from "@neverquest/icons/bleeding.svg?react"
import IconBlockChance from "@neverquest/icons/block-chance.svg?react"
import IconBlunt from "@neverquest/icons/blunt.svg?react"
import IconButchery from "@neverquest/icons/butchery.svg?react"
import IconCruelty from "@neverquest/icons/cruelty.svg?react"
import IconDistance from "@neverquest/icons/distance.svg?react"
import IconExecution from "@neverquest/icons/execution.svg?react"
import IconFinesse from "@neverquest/icons/finesse.svg?react"
import IconHealth from "@neverquest/icons/health.svg?react"
import IconMarksmanship from "@neverquest/icons/marksmanship.svg?react"
import IconMight from "@neverquest/icons/might.svg?react"
import IconMonsterDamage from "@neverquest/icons/monster-damage.svg?react"
import IconParryChance from "@neverquest/icons/parry-chance.svg?react"
import IconPiercing from "@neverquest/icons/piercing.svg?react"
import IconRanged from "@neverquest/icons/ranged.svg?react"
import IconRecovery from "@neverquest/icons/recovery.svg?react"
import IconResilience from "@neverquest/icons/resilience.svg?react"
import IconSlashing from "@neverquest/icons/slashing.svg?react"
import IconStability from "@neverquest/icons/stability.svg?react"
import IconStaggered from "@neverquest/icons/staggered.svg?react"
import IconStunned from "@neverquest/icons/stunned.svg?react"
import IconTwoHanded from "@neverquest/icons/two-handed.svg?react"

import type { AttributeOrMasteryBaseData } from "@neverquest/types"
import type { SVGIcon } from "@neverquest/types/components"
import type { Mastery, Skill } from "@neverquest/types/unions"

export const MASTERIES: Record<
	Mastery,
	AttributeOrMasteryBaseData & {
		instructionIcons: [SVGIcon, ...SVGIcon[]]
		instructions: string
		requiredSkill: Skill
	}
> = {
	butchery: {
		base: 0.2,
		description: "Affects # execution threshold.",
		descriptionIcons: [IconExecution],
		Icon: IconButchery,
		increment: 0.5 / LEVELLING_MAXIMUM,
		instructionIcons: [IconTwoHanded],
		instructions: "Trains when dealing damage with a # two-handed weapon.",
		requiredSkill: "siegecraft",
	},
	cruelty: {
		base: 0.25,
		description: "Affects # bleed damage.",
		descriptionIcons: [IconBleeding],
		Icon: IconCruelty,
		increment: 1 / LEVELLING_MAXIMUM,
		instructionIcons: [IconPiercing],
		instructions: "Trains when dealing damage with a # piercing weapon.",
		requiredSkill: "anatomy",
	},
	finesse: {
		base: 0,
		description: "Affects damage absorbed and reflected when # parrying.",
		descriptionIcons: [IconParryChance],
		Icon: IconFinesse,
		increment: 1 / LEVELLING_MAXIMUM,
		instructionIcons: [IconSlashing],
		instructions: "Trains when dealing damage with a # slashing weapon.",
		requiredSkill: "escrime",
	},
	marksmanship: {
		base: 0,
		description: "Affects the # distance a monster must close before it can attack.",
		descriptionIcons: [IconDistance],
		Icon: IconMarksmanship,
		increment: 0.7 / LEVELLING_MAXIMUM,
		instructionIcons: [IconRanged],
		instructions: "Trains when dealing damage with a # ranged weapon.",
		requiredSkill: "archery",
	},
	might: {
		base: 1800,
		description: "Affects # stun duration.",
		descriptionIcons: [IconStunned],
		Icon: IconMight,
		increment: Math.round(4000 / LEVELLING_MAXIMUM),
		instructionIcons: [IconBlunt],
		instructions: "Trains when dealing damage with a # blunt weapon.",
		requiredSkill: "traumatology",
	},
	resilience: {
		base: 0,
		description: "Affects # recovery rate.",
		descriptionIcons: [IconRecovery],
		Icon: IconResilience,
		increment: 1 / LEVELLING_MAXIMUM,
		instructionIcons: [IconHealth, IconMonsterDamage],
		instructions: "Trains when losing # health on being # struck.",
		requiredSkill: "armorcraft",
	},
	stability: {
		base: 1800,
		description: "Affects # stagger duration.",
		descriptionIcons: [IconStaggered],
		Icon: IconStability,
		increment: Math.round(4000 / LEVELLING_MAXIMUM),
		instructionIcons: [IconBlockChance, IconStaggered],
		instructions: "Trains when # blocking or # staggering a monster.",
		requiredSkill: "shieldcraft",
	},
}

export const MASTERY_COST_BASE = 2

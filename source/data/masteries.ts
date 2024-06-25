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
import IconParryAvoidance from "@neverquest/icons/parry-avoidance.svg?react"
import IconParryChance from "@neverquest/icons/parry-chance.svg?react"
import IconParryDamage from "@neverquest/icons/parry-damage.svg?react"
import IconPiercing from "@neverquest/icons/piercing.svg?react"
import IconRanged from "@neverquest/icons/ranged.svg?react"
import IconRecovery from "@neverquest/icons/recovery.svg?react"
import IconResilience from "@neverquest/icons/resilience.svg?react"
import IconSlashing from "@neverquest/icons/slashing.svg?react"
import IconStability from "@neverquest/icons/stability.svg?react"
import IconStaggered from "@neverquest/icons/staggered.svg?react"
import IconStunned from "@neverquest/icons/stunned.svg?react"
import IconTwoHanded from "@neverquest/icons/two-handed.svg?react"

import { LEVELLING_MAXIMUM } from "./general"

import type { AttributeOrMasteryBase } from "@neverquest/types"
import type { SVGIcon } from "@neverquest/types/general"
import type { Mastery, Skill } from "@neverquest/types/unions"

export const MASTERIES: Record<
	Mastery,
	AttributeOrMasteryBase & {
		instructionIcons: [SVGIcon, ...SVGIcon[]]
		instructions: string
		maximum: number
		requiredSkill: Skill
	}
> = {
	butchery: {
		base: 0.2,
		description: "Affects # execution threshold.",
		descriptionIcons: [IconExecution],
		Icon: IconButchery,
		instructionIcons: [IconTwoHanded],
		instructions: "Trains when dealing damage with a # two-handed weapon.",
		maximum: 0.4,
		requiredSkill: "siegecraft",
	},
	cruelty: {
		base: 0.25,
		description: "Affects # bleed damage.",
		descriptionIcons: [IconBleeding],
		Icon: IconCruelty,
		instructionIcons: [IconPiercing],
		instructions: "Trains when dealing damage with a # piercing weapon.",
		maximum: 1.1,
		requiredSkill: "anatomy",
	},
	finesse: {
		base: 0,
		description: "Affects damage # avoided and # reflected when # parrying.",
		descriptionIcons: [IconParryAvoidance, IconParryDamage, IconParryChance],
		Icon: IconFinesse,
		instructionIcons: [IconSlashing],
		instructions: "Trains when dealing damage with a # slashing weapon.",
		maximum: 0.65,
		requiredSkill: "escrime",
	},
	marksmanship: {
		base: 0,
		description: "Affects the # distance a monster must close before it can attack.",
		descriptionIcons: [IconDistance],
		Icon: IconMarksmanship,
		instructionIcons: [IconRanged],
		instructions: "Trains when dealing damage with a # ranged weapon.",
		maximum: 0.6,
		requiredSkill: "archery",
	},
	might: {
		base: 1500,
		description: "Affects # stun duration.",
		descriptionIcons: [IconStunned],
		Icon: IconMight,
		instructionIcons: [IconBlunt],
		instructions: "Trains when dealing damage with a # blunt weapon.",
		maximum: 4000,
		requiredSkill: "traumatology",
	},
	resilience: {
		base: 0,
		description: "Affects # recovery rate.",
		descriptionIcons: [IconRecovery],
		Icon: IconResilience,
		instructionIcons: [IconHealth, IconMonsterDamage],
		instructions: "Trains when losing # health on being # struck.",
		maximum: -1,
		requiredSkill: "armorcraft",
	},
	stability: {
		base: 1500,
		description: "Affects # stagger duration.",
		descriptionIcons: [IconStaggered],
		Icon: IconStability,
		instructionIcons: [IconBlockChance, IconStaggered],
		instructions: "Trains when # blocking or # staggering a monster.",
		maximum: 4000,
		requiredSkill: "shieldcraft",
	},
}

export const MASTERY_COST = {
	base: 3,
	maximum: LEVELLING_MAXIMUM,
}

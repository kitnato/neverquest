import { useRecoilCallback } from "recoil"

import { ATTRIBUTES } from "@neverquest/data/attributes"
import { MERCHANT_OFFERS } from "@neverquest/data/caravan"
import { ARMOR_NONE, SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/gear"
import { RETIREMENT_STAGE } from "@neverquest/data/retirement"
import { SKILLS } from "@neverquest/data/skills"
import { useAcquireSkill } from "@neverquest/hooks/actions/useAcquireSkill"
import { useInitialize } from "@neverquest/hooks/actions/useInitialize"
import { useNeutralize } from "@neverquest/hooks/actions/useNeutralize"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { useResetAttributes } from "@neverquest/hooks/actions/useResetAttributes"
import { useResetCharacter } from "@neverquest/hooks/actions/useResetCharacter"
import { useResetWilderness } from "@neverquest/hooks/actions/useResetWilderness"
import { absorbedEssence } from "@neverquest/state/attributes"
import {
	blacksmithInventory,
	expandedBuyback,
	fletcherInventory,
	hasGeneratedOffer,
	merchantInventory,
	monologue,
} from "@neverquest/state/caravan"
import {
	corpse, generation,
	hasDefeatedFinality,
	name,
	stage,
	stageHighest,
	stageMaximum,
	stageRetired,
} from "@neverquest/state/character"
import { armor, gems, shield, weapon } from "@neverquest/state/gear"
import { inventory } from "@neverquest/state/inventory"
import { expandedMasteries, masteryProgress, masteryRank } from "@neverquest/state/masteries"
import { questProgress } from "@neverquest/state/quests"
import { essence } from "@neverquest/state/resources"
import { isSkillAcquired } from "@neverquest/state/skills"
import { isTraitAcquired, selectedTrait } from "@neverquest/state/traits"
import { isInheritableItem } from "@neverquest/types/type-guards"
import {
	ATTRIBUTE_TYPES,
	CREW_MEMBER_TYPES,
	MASTERY_TYPES,
	SKILL_TYPES,
} from "@neverquest/types/unions"
import { getPerkEffect, getSnapshotGetter } from "@neverquest/utilities/getters"

export function useRetire() {
	const acquireSkill = useAcquireSkill()
	const initialize = useInitialize()
	const neutralize = useNeutralize()
	const progressQuest = useProgressQuest()
	const resetAttributes = useResetAttributes()
	const resetCharacter = useResetCharacter()
	const resetWilderness = useResetWilderness()

	return useRecoilCallback(
		({ reset, set, snapshot }) =>
			() => {
				const get = getSnapshotGetter(snapshot)

				const nextGeneration = get(generation) + 1
				const selectedTraitValue = get(selectedTrait)
				const stageMaximumValue = get(stageMaximum)

				if (stageMaximumValue < RETIREMENT_STAGE) {
					return
				}

				if (selectedTraitValue !== undefined) {
					set(isTraitAcquired(selectedTraitValue), true)
					reset(selectedTrait)

					progressQuest({ quest: "traits" })
				}

				resetAttributes()
				resetCharacter(true)

				set(essence, Math.round(
					getPerkEffect({ generation: nextGeneration, perk: "startingEssence" })
					* get(absorbedEssence),
				))
				set(generation, nextGeneration)
				set(stageRetired, stageMaximumValue)

				reset(armor)
				reset(blacksmithInventory)
				reset(corpse)
				reset(expandedBuyback)
				reset(expandedMasteries)
				reset(hasDefeatedFinality("res dominus"))
				reset(fletcherInventory)
				reset(gems(ARMOR_NONE.ID))
				reset(gems(SHIELD_NONE.ID))
				reset(gems(WEAPON_NONE.ID))
				reset(name)
				reset(shield)
				reset(stage)
				reset(stageHighest)
				reset(weapon)

				reset(questProgress("attributesIncreasing"))
				reset(questProgress("hiring"))
				reset(questProgress("powerLevel"))
				reset(questProgress("stages"))

				progressQuest({
					amount: ATTRIBUTE_TYPES.filter(attribute => ATTRIBUTES[attribute].requiredSkill === undefined).length,
					isAbsolute: true,
					quest: "attributesUnlocking",
				})

				for (const crewMember of CREW_MEMBER_TYPES) {
					reset(monologue(crewMember))
				}

				for (let index = 1; index <= stageMaximumValue; index++) {
					reset(hasGeneratedOffer(index))
				}

				for (const mastery of MASTERY_TYPES) {
					reset(masteryProgress(mastery))
					reset(masteryRank(mastery))
				}

				const inheritedSkills = SKILL_TYPES.filter(skill => SKILLS[skill].isInheritable && get(isSkillAcquired(skill)))

				progressQuest({
					amount: inheritedSkills.length,
					isAbsolute: true,
					quest: "skills",
				})

				SKILL_TYPES.forEach((skill) => {
					if (!inheritedSkills.includes(skill)) {
						reset(isSkillAcquired(skill))
					}
				})

				const inheritedItems = get(inventory).filter(currentItem => isInheritableItem(currentItem))
				const inheritableOfferNames = Object
					.values(MERCHANT_OFFERS)
					.map(({ offer }) => offer)
					.filter(isInheritableItem)
					.map(({ name }) => name)

				progressQuest({
					amount: inheritedItems.filter(({ name }) =>
						inheritableOfferNames.some(inheritableOfferName => name === inheritableOfferName),
					).length,
					isAbsolute: true,
					quest: "purchasingInheritable",
				})

				set(inventory, inheritedItems)

				for (const item of get(merchantInventory)) {
					neutralize({ item })
				}

				reset(merchantInventory)

				progressQuest({ quest: "retiring" })

				resetWilderness()
				initialize(true)
			},
		[
			acquireSkill,
			initialize,
			neutralize,
			progressQuest,
			resetAttributes,
			resetCharacter,
			resetWilderness,
		],
	)
}

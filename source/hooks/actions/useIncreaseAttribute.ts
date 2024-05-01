import { useRecoilCallback } from "recoil"

import { ATTRIBUTES } from "@neverquest/data/attributes"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence"
import {
	areAttributesAffordable,
	attributeRank,
	isAttributeAtMaximum,
	powerLevel,
} from "@neverquest/state/attributes"
import { questProgress } from "@neverquest/state/quests"
import { isShowing } from "@neverquest/state/ui"
import { getAttributePointCost, getSnapshotGetter } from "@neverquest/utilities/getters"

import type { Attribute } from "@neverquest/types/unions"

export function useIncreaseAttribute() {
	const progressQuest = useProgressQuest()
	const transactEssence = useTransactEssence()

	return useRecoilCallback(
		({ set, snapshot }) =>
			(attribute: Attribute) => {
				const get = getSnapshotGetter(snapshot)

				if (!get(areAttributesAffordable) || get(isAttributeAtMaximum(attribute))) {
					return
				}

				const { shows } = ATTRIBUTES[attribute]
				const attributeRankValue = get(attributeRank(attribute))
				const newRank = attributeRankValue + 1

				if (shows !== undefined) {
					set(isShowing(shows), true)
				}

				set(attributeRank(attribute), newRank)
				set(isShowing("lootedEssenceProgress"), true)

				transactEssence(-getAttributePointCost(get(powerLevel)))

				progressQuest({ quest: "powerLevel" })
				progressQuest({ quest: "powerLevelUltra" })

				if (attributeRankValue === 0) {
					progressQuest({ quest: "attributesIncreasing" })
				}

				set(questProgress("survivingNoAttributes"), Number.NEGATIVE_INFINITY)
			},
		[progressQuest, transactEssence],
	)
}

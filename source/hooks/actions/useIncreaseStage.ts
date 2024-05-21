import { generateLocation } from "@kitnato/locran"
import { useRecoilCallback } from "recoil"

import { CREW } from "@neverquest/data/caravan"
import { FINALITY_STAGE } from "@neverquest/data/monster"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { useToggleAttacking } from "@neverquest/hooks/actions/useToggleAttacking"
import { isAttacking, stage, stageHighest, stageMaximum, stageRetired, wildernesses } from "@neverquest/state/character"
import { questProgress } from "@neverquest/state/quests"
import { isShowing } from "@neverquest/state/ui"
import { getAffixStructure, getSnapshotGetter } from "@neverquest/utilities/getters"

const firstStageForCrewHiring = Object.values(CREW)
	.map(({ requiredStage }) => requiredStage)
	.toSorted((requiredStage1, requiredStage2) => requiredStage1 - requiredStage2)
	.find(requiredStage => requiredStage > 1)

export function useIncreaseStage() {
	const progressQuest = useProgressQuest()
	const toggleAttacking = useToggleAttacking()

	return useRecoilCallback(
		({ reset, set, snapshot }) =>
			() => {
				const get = getSnapshotGetter(snapshot)

				const stageValue = get(stage)
				const nextStage = stageValue + 1

				if (firstStageForCrewHiring !== undefined && nextStage >= firstStageForCrewHiring) {
					set(isShowing("crewMemberHiring"), true)
				}

				set(stage, nextStage)

				if (Object.values(FINALITY_STAGE).includes(nextStage) && get(isAttacking)) {
					toggleAttacking()
				}

				if (stageValue === get(stageMaximum)) {
					if (get(stageHighest) < nextStage) {
						set(stageHighest, nextStage)
					}

					if (get(stageRetired) < nextStage) {
						reset(stageRetired)
					}

					set(wildernesses, currentWildernesses => [
						...currentWildernesses,
						generateLocation({ affixStructure: getAffixStructure() }),
					])

					progressQuest({ amount: stageValue === 1 ? 2 : 1, quest: "stages" })
					progressQuest({ amount: stageValue === 1 ? 2 : 1, quest: "stagesEnd" })

					if (stageValue === get(questProgress("survivingNoAttributes")) + 1) {
						progressQuest({ quest: "survivingNoAttributes" })
					}

					if (stageValue === get(questProgress("survivingNoGear")) + 1) {
						progressQuest({ quest: "survivingNoGear" })
					}
				}
			},
		[progressQuest, toggleAttacking],
	)
}

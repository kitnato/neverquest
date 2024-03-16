import { useRecoilCallback } from "recoil"

import { QUEST_REQUIREMENTS } from "@neverquest/data/quests"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { essence } from "@neverquest/state/resources"
import { isShowing } from "@neverquest/state/ui"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

export function useTransactEssence() {
  const progressQuest = useProgressQuest()

  return useRecoilCallback(
    ({ set, snapshot }) =>
      (difference: number) => {
        if (difference !== 0) {
          const get = getSnapshotGetter(snapshot)

          const newEssence = get(essence) + difference

          set(essence, newEssence)

          set(isShowing(`capabilities`), true)
          set(isShowing(`essence`), true)

          if (difference < 0) {
            progressQuest({ amount: Math.abs(difference), quest: `spendingEssence` })
          }

          if (newEssence === QUEST_REQUIREMENTS.essenceCount) {
            progressQuest({ quest: `essenceCount` })
          }
        }
      },
    [progressQuest],
  )
}

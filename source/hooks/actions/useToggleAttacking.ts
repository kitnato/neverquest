import { useRecoilCallback } from "recoil"

import { RAGE } from "@neverquest/data/monster"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { attackDuration, isAttacking } from "@neverquest/state/character"
import { isStageCompleted, isStageStarted, stage } from "@neverquest/state/encounter"
import {
  distance,
  isEnraged,
  isMonsterDead,
  monsterAttackDuration,
  monsterAttackRate,
  rage,
} from "@neverquest/state/monster"
import { attackRate } from "@neverquest/state/statistics"
import { isShowing } from "@neverquest/state/ui"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

export function useToggleAttacking() {
  const progressQuest = useProgressQuest()

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot)

        const { increment, requiredStage } = RAGE
        const isAttackingValue = get(isAttacking)

        if (get(isStageCompleted) && !isAttackingValue) {
          return
        }

        set(isAttacking, (isCurrentlyAttacking) => !isCurrentlyAttacking)

        set(isShowing(`attackRate`), true)
        set(isShowing(`health`), true)
        set(isShowing(`wildernessStatus`), true)

        if (isAttackingValue) {
          reset(attackDuration)
          reset(monsterAttackDuration)

          if (!get(isMonsterDead)) {
            if (!get(isEnraged) && get(stage) >= requiredStage) {
              set(rage, (currentRage) => currentRage + increment)
            }

            reset(distance)

            progressQuest({ quest: `retreating` })
          }
        } else {
          set(isStageStarted, true)
          set(attackDuration, get(attackRate))
          set(monsterAttackDuration, get(monsterAttackRate))
        }
      },
    [progressQuest],
  )
}

import { useRecoilCallback } from "recoil"

import { CORPSE_VALUE } from "@neverquest/data/encounter"
import { HEALTH_LOW_THRESHOLD } from "@neverquest/data/reserves"
import { useAddDelta } from "@neverquest/hooks/actions/useAddDelta"
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest"
import { useToggleAttacking } from "@neverquest/hooks/actions/useToggleAttacking"
import { absorbedEssence } from "@neverquest/state/attributes"
import { isAttacking } from "@neverquest/state/character"
import { corpse, stage } from "@neverquest/state/encounter"
import { ownedItem } from "@neverquest/state/inventory"
import { isRelicEquipped } from "@neverquest/state/items"
import {
  health,
  healthMaximumPoisoned,
  isInvulnerable,
  regenerationDuration,
} from "@neverquest/state/reserves"
import { essence } from "@neverquest/state/resources"
import type { DeltaReserve } from "@neverquest/types/ui"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

export function useChangeHealth() {
  const addDelta = useAddDelta()
  const progressQuest = useProgressQuest()
  const toggleAttacking = useToggleAttacking()

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      ({ contents, value }: DeltaReserve) => {
        const get = getSnapshotGetter(snapshot)

        const deltaDisplay =
          contents === undefined ? [] : (Array.isArray(contents) ? contents : [contents])
        const formattedValue = formatNumber({ value })
        const healthMaximumPoisonedValue = get(healthMaximumPoisoned)
        const isAttackingValue = get(isAttacking)
        const isPositive = value > 0

        let newHealth = get(health) + (get(isInvulnerable) ? (isPositive ? value : 0) : value)

        if (newHealth <= 0) {
          const ownedItemPhylactery = get(ownedItem(`phylactery`))

          newHealth = 0

          reset(regenerationDuration(`health`))

          progressQuest({ quest: `flatlining` })

          if (isAttackingValue) {
            toggleAttacking()
          }

          if (ownedItemPhylactery === undefined) {
            set(corpse, {
              essence: Math.round(get(essence) + get(absorbedEssence) * CORPSE_VALUE),
              stage: get(stage),
            })
          }
        }

        if (newHealth >= healthMaximumPoisonedValue) {
          newHealth = healthMaximumPoisonedValue

          reset(regenerationDuration(`health`))
        }

        if (
          !isPositive &&
          newHealth > 0 &&
          newHealth <= healthMaximumPoisonedValue * HEALTH_LOW_THRESHOLD &&
          isAttackingValue &&
          get(isRelicEquipped(`dream catcher`))
        ) {
          toggleAttacking()

          addDelta({
            contents: {
              color: `text-secondary`,
              value: `CAUGHT`,
            },
            delta: `health`,
          })
        }

        set(health, newHealth)

        if (value !== 0) {
          deltaDisplay.push({
            color: isPositive ? `text-success` : `text-danger`,
            value: isPositive ? `+${formattedValue}` : formattedValue,
          })
        }

        addDelta({
          contents: deltaDisplay,
          delta: `health`,
        })
      },
    [addDelta, progressQuest, toggleAttacking],
  )
}

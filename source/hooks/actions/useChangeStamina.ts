import { useRecoilCallback } from "recoil"

import { useAddDelta } from "@neverquest/hooks/actions/useAddDelta"
import {
  isInexhaustible,
  regenerationDuration,
  stamina,
  staminaMaximumBlighted,
} from "@neverquest/state/reserves"
import type { DeltaReserve } from "@neverquest/types/ui"
import { formatNumber } from "@neverquest/utilities/formatters"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

export function useChangeStamina() {
  const addDelta = useAddDelta()

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      ({ contents, value }: DeltaReserve) => {
        const get = getSnapshotGetter(snapshot)

        const deltaDisplay =
          contents === undefined ? [] : (Array.isArray(contents) ? contents : [contents])
        const formattedValue = formatNumber({ value })
        const isPositive = value > 0
        const staminaMaximumBlightedValue = get(staminaMaximumBlighted)

        let newStamina = get(stamina) + (get(isInexhaustible) ? (isPositive ? value : 0) : value)

        if (newStamina <= 0) {
          newStamina = 0
        }

        if (newStamina >= staminaMaximumBlightedValue) {
          newStamina = staminaMaximumBlightedValue

          reset(regenerationDuration(`stamina`))
        }

        set(stamina, newStamina)

        if (value !== 0) {
          deltaDisplay.push({
            color: isPositive ? `text-success` : `text-danger`,
            value: isPositive ? `+${formattedValue}` : formattedValue,
          })
        }

        addDelta({
          contents: deltaDisplay,
          delta: `stamina`,
        })
      },
    [addDelta],
  )
}

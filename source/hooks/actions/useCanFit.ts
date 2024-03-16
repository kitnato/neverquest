import { useRecoilCallback } from "recoil"

import { encumbrance, encumbranceMaximum } from "@neverquest/state/inventory"
import { getSnapshotGetter } from "@neverquest/utilities/getters"

export function useCanFit() {
  return useRecoilCallback(
    ({ snapshot }) =>
      (weight: number) => {
        const get = getSnapshotGetter(snapshot)

        return weight === 0 || get(encumbrance) + weight <= get(encumbranceMaximum)
      },
    [],
  )
}

import { nanoid } from "nanoid"
import { useRecoilCallback } from "recoil"

import { deltas } from "@neverquest/state/deltas"
import type { DeltaDisplay } from "@neverquest/types/ui"
import type { Delta } from "@neverquest/types/unions"

export function useAddDelta() {
  return useRecoilCallback(
    ({ set }) =>
      ({ contents, delta }: { contents: DeltaDisplay | DeltaDisplay[]; delta: Delta }) => {
        if (Array.isArray(contents) && contents.length === 0) {
          return
        }

        set(deltas(delta), (currentDelta) => [
          ...currentDelta,
          { display: Array.isArray(contents) ? contents : [contents], ID: nanoid() },
        ])
      },
    [],
  )
}

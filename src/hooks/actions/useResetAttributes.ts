import { useRecoilCallback } from "recoil";

import { ATTRIBUTES } from "@neverquest/data/attributes";
import { attributes } from "@neverquest/state/attributes";
import type { Attribute } from "@neverquest/types/unions";

export function useResetAttributes() {
  return useRecoilCallback(
    ({ set }) =>
      () =>
        Object.keys(ATTRIBUTES).forEach((type) =>
          set(attributes(type as Attribute), (current) => ({ ...current, points: 0 }))
        ),
    []
  );
}

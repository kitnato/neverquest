import { useRecoilCallback } from "recoil";

import { isShowing } from "@neverquest/state/isShowing";
import { SHOWING_TYPES } from "@neverquest/types/unions";

export function useShowEverything() {
  return useRecoilCallback(
    ({ set }) =>
      () =>
        Object.values(SHOWING_TYPES).forEach((showing) => set(isShowing(showing), true)),
    []
  );
}

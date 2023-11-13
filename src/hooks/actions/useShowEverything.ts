import { useRecoilCallback } from "recoil";

import { isShowing } from "@neverquest/state/isShowing";
import { SHOWING_TYPES } from "@neverquest/types/unions";

export function useShowEverything() {
  return useRecoilCallback(
    ({ set }) =>
      () => {
        for (const showing of Object.values(SHOWING_TYPES)) {
          set(isShowing(showing), true);
        }
      },
    [],
  );
}

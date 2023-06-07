import { useRecoilCallback } from "recoil";

import { isShowing } from "@neverquest/state/isShowing";
import { SHOWING } from "@neverquest/types/unions";

export function useShowEverything() {
  return useRecoilCallback(
    ({ set }) =>
      () =>
        Object.values(SHOWING).forEach((showing) => set(isShowing(showing), true)),
    []
  );
}

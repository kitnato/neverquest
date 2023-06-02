import { useRecoilCallback } from "recoil";

import { isShowing } from "@neverquest/state/isShowing";
import { Showing } from "@neverquest/types/enums";

export function useShowEverything() {
  return useRecoilCallback(
    ({ set }) =>
      () =>
        Object.values(Showing).forEach((showing) => set(isShowing(showing as Showing), true)),
    []
  );
}

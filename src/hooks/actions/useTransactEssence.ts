import { useRecoilCallback } from "recoil";

import { isShowing } from "@neverquest/state/isShowing";
import { essence } from "@neverquest/state/resources";

export function useTransactEssence() {
  return useRecoilCallback(
    ({ set }) =>
      (difference: number) => {
        if (difference !== undefined && difference !== 0) {
          set(essence, (current) => current + difference);
          set(isShowing("essence"), true);
        }
      },
    [],
  );
}

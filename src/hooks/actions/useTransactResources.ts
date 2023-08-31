import { useRecoilCallback } from "recoil";

import { isShowing } from "@neverquest/state/isShowing";
import { coins, essence, scrap } from "@neverquest/state/resources";
import type { ResourceTransaction } from "@neverquest/types/props";

export function useTransactResources() {
  return useRecoilCallback(
    ({ set }) =>
      (difference: ResourceTransaction) => {
        const { coinsDifference, essenceDifference, scrapDifference } = difference;

        if (coinsDifference !== undefined && coinsDifference !== 0) {
          set(coins, (current) => current + coinsDifference);
          set(isShowing("coins"), true);
        }

        if (essenceDifference !== undefined && essenceDifference !== 0) {
          set(essence, (current) => current + essenceDifference);
          set(isShowing("essence"), true);
        }

        if (scrapDifference !== undefined && scrapDifference !== 0) {
          set(scrap, (current) => current + scrapDifference);
          set(isShowing("scrap"), true);
        }
      },
    [],
  );
}

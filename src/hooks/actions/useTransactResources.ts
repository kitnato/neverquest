import { useRecoilCallback } from "recoil";

import { isShowing } from "@neverquest/state/isShowing";
import {
  coins,
  coinsLoot,
  essence,
  essenceLoot,
  scrap,
  scrapLoot,
} from "@neverquest/state/resources";
import type { ResourceTransaction } from "@neverquest/types/props";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useTransactResources() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      (difference: ResourceTransaction) => {
        const get = getSnapshotGetter(snapshot);

        const { coinsDifference, essenceDifference, scrapDifference } = difference;

        const isLooting =
          coinsDifference === undefined &&
          essenceDifference === undefined &&
          scrapDifference === undefined;

        const coinsValue = isLooting ? get(coinsLoot) : coinsDifference ?? 0;
        const essenceValue = isLooting ? get(essenceLoot) : essenceDifference ?? 0;
        const scrapValue = isLooting ? get(scrapLoot) : scrapDifference ?? 0;

        if (coinsValue !== 0) {
          set(coins, (current) => current + coinsValue);

          set(isShowing("coins"), true);

          if (isLooting) {
            set(coinsLoot, 0);
          }
        }

        if (essenceValue !== 0) {
          set(essence, (current) => current + essenceValue);

          set(isShowing("essence"), true);
          set(isShowing("attributesButton"), true);

          if (isLooting) {
            set(essenceLoot, 0);
          }
        }

        if (scrapValue !== 0) {
          set(scrap, (current) => current + scrapValue);

          set(isShowing("scrap"), true);

          if (isLooting) {
            set(scrapLoot, 0);
          }
        }
      },
    [],
  );
}

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
import { Showing } from "@neverquest/types/enums";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useTransactResources() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      (
        difference: Partial<{
          coinsDifference: number;
          essenceDifference: number;
          scrapDifference: number;
        }>
      ) => {
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

          if (!get(isShowing(Showing.Coins))) {
            set(isShowing(Showing.Coins), true);
          }

          if (isLooting) {
            set(coinsLoot, 0);
          }
        }

        if (essenceValue !== 0) {
          set(essence, (current) => current + essenceValue);

          if (!get(isShowing(Showing.Essence))) {
            set(isShowing(Showing.Essence), true);
          }

          if (!get(isShowing(Showing.AttributesButton))) {
            set(isShowing(Showing.AttributesButton), true);
          }

          if (isLooting) {
            set(essenceLoot, 0);
          }
        }

        if (scrapValue !== 0) {
          set(scrap, (current) => current + scrapValue);

          if (!get(isShowing(Showing.Scrap))) {
            set(isShowing(Showing.Scrap), true);
          }

          if (isLooting) {
            set(scrapLoot, 0);
          }
        }
      },
    []
  );
}

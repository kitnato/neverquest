import { nanoid } from "nanoid";
import { useRecoilCallback } from "recoil";

import { KNAPSACK_SIZE } from "@neverquest/data/inventory";
import { canFit, encumbranceMaximum, hasKnapsack, inventory } from "@neverquest/state/inventory";
import type { Consumable, Trinket } from "@neverquest/types";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useAcquireItem() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      ({ item }: { item: Consumable | Trinket }) => {
        const get = getSnapshotGetter(snapshot);

        const id = nanoid();
        const { name, weight } = item;

        if (!get(canFit(weight))) {
          return null;
        }

        if (name === "Knapsack") {
          set(encumbranceMaximum, (current) => current + KNAPSACK_SIZE);
          set(hasKnapsack, true);
        } else {
          set(inventory, (current) => ({
            ...current,
            [id]: item,
          }));
        }

        return id;
      },
    []
  );
}

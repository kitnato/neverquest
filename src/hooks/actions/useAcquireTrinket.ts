import { nanoid } from "nanoid";
import { useRecoilCallback } from "recoil";

import { canFit, encumbranceMaximum, hasKnapsack, inventory } from "@neverquest/state/inventory";
import type { Trinket } from "@neverquest/types";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useAcquireTrinket() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      ({ trinket }: { trinket: Trinket }) => {
        const get = getSnapshotGetter(snapshot);

        const id = nanoid();
        const { name, weight } = trinket;

        if (!get(canFit(weight))) {
          return null;
        }

        if (name === "Knapsack") {
          set(encumbranceMaximum, (current) => current + 1);
          set(hasKnapsack, true);
        } else {
          set(inventory, (current) => ({
            ...current,
            [id]: trinket,
          }));
        }

        return id;
      },
    []
  );
}

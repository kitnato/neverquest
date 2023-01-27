import { nanoid } from "nanoid";
import { useRecoilCallback } from "recoil";

import { TRINKET_KNAPSACK } from "@neverquest/data/trinkets";
import { canFit, encumbranceMaximum, hasKnapsack, inventory } from "@neverquest/state/inventory";
import { Trinket } from "@neverquest/types";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useAcquireTrinket() {
  return useRecoilCallback(({ set, snapshot }) => ({ trinket }: { trinket: Trinket }) => {
    const get = getSnapshotGetter(snapshot);

    const id = nanoid();
    const key = nanoid();
    const { name, weight } = trinket;

    if (!get(canFit(weight))) {
      return false;
    }

    if (name === TRINKET_KNAPSACK.name) {
      set(encumbranceMaximum, 5);
      set(hasKnapsack, true);

      return true;
    }

    set(inventory, (current) => ({
      ...current,
      [id]: { isEquipped: false, item: trinket, key },
    }));

    return true;
  });
}

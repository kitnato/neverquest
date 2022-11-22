import { nanoid } from "nanoid";
import { useRecoilCallback } from "recoil";

import { ITEM_KNAPSACK } from "@neverquest/constants/items";
import { canFit, encumbranceMaximum, hasKnapsack, inventory } from "@neverquest/state/inventory";
import { Item } from "@neverquest/types";
import { getSnapshotGetter } from "@neverquest/utilities/helpers";

export default function () {
  return useRecoilCallback(({ set, snapshot }) => ({ item }: { item: Item }) => {
    const get = getSnapshotGetter(snapshot);

    const id = nanoid();
    const key = nanoid();
    const { name, weight } = item;

    if (!get(canFit(weight))) {
      return false;
    }

    if (name === ITEM_KNAPSACK.name) {
      set(encumbranceMaximum, (current) => current + 1);
      set(hasKnapsack, true);

      return true;
    }

    set(inventory, (current) => ({
      ...current,
      [id]: { isEquipped: false, key, possession: item },
    }));

    return true;
  });
}

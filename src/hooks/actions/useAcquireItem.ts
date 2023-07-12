import { useRecoilCallback } from "recoil";

import { KNAPSACK_SIZE } from "@neverquest/data/inventory";
import { attributes } from "@neverquest/state/attributes";
import {
  canFit,
  consumablesAcquired,
  encumbranceMaximum,
  hasKnapsack,
  inventory,
} from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import type { ConsumableItem, TrinketItem } from "@neverquest/types";
import { isConsumable } from "@neverquest/types/type-guards";
import type { Consumable } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useAcquireItem() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      (item: ConsumableItem | TrinketItem) => {
        const get = getSnapshotGetter(snapshot);

        const { id, type, weight } = item;

        if (!get(canFit(weight))) {
          return false;
        }

        if (type === "knapsack") {
          set(encumbranceMaximum, (current) => current + KNAPSACK_SIZE);
          set(hasKnapsack, true);

          set(isShowing("weight"), true);
        } else {
          if (type === "antique coin") {
            set(isShowing("lootBonus"), true);

            set(attributes("luck"), (current) => ({ ...current, isUnlocked: true }));
          }

          if (type === "tome of power") {
            set(isShowing("lootBonusDetails"), true);
          }

          if (isConsumable(item)) {
            set(consumablesAcquired, (current) => [
              ...current,
              { key: id, type: type as Consumable },
            ]);
          }

          set(inventory, (current) => current.concat(item));
        }

        return true;
      },
    []
  );
}

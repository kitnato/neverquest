import { useRecoilCallback } from "recoil";

import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { inventory } from "@neverquest/state/inventory";
import type { Item } from "@neverquest/types";
import type { ItemForfeiture } from "@neverquest/types/props";
import { isConsumable } from "@neverquest/types/type-guards";
import { getSellPrice, getSnapshotGetter } from "@neverquest/utilities/getters";

export function useForfeitItem() {
  const toggleEquipGear = useToggleEquipGear();
  const transactResources = useTransactResources();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      (item: Item, type: ItemForfeiture) => {
        const get = getSnapshotGetter(snapshot);

        const inventoryValue = get(inventory);

        const { id } = item;

        if (isConsumable(item)) {
          const { stack, type } = item;

          if (stack === 1) {
            set(inventory, (current) => current.filter((current) => current.id !== id));
          } else {
            const stackIndex = inventoryValue.findIndex(
              (current) => isConsumable(current) && current.type === type,
            );

            set(inventory, (current) => [
              ...current.slice(0, stackIndex),
              { ...item, stack: stack - 1 },
              ...current.slice(stackIndex + 1),
            ]);
          }
        } else {
          set(inventory, (current) => current.filter((current) => current.id !== id));
        }

        if (type === "sale") {
          transactResources({ coinsDifference: getSellPrice(item) });
        }
      },
    [toggleEquipGear, transactResources],
  );
}

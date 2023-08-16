import { useRecoilCallback } from "recoil";

import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { inventory } from "@neverquest/state/inventory";
import type { InventoryItem } from "@neverquest/types";
import { isStackable } from "@neverquest/types/type-guards";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useForfeitItem() {
  const toggleEquipGear = useToggleEquipGear();
  const transactResources = useTransactResources();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      (item: InventoryItem) => {
        const get = getSnapshotGetter(snapshot);

        const inventoryValue = get(inventory);

        const { id } = item;

        if (isStackable(item)) {
          const { stack, type } = item;

          if (stack === 1) {
            set(inventory, (current) => current.filter((current) => current.id !== id));
          } else {
            const stackIndex = inventoryValue.findIndex(
              (current) => isStackable(current) && current.type === type,
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
      },
    [toggleEquipGear, transactResources],
  );
}

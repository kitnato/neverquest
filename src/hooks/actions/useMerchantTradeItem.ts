import { useRecoilCallback } from "recoil";

import { hasBoughtFromMerchant, merchantInventory } from "@neverquest/state/caravan";
import type { InventoryItem } from "@neverquest/types";
import { isGear, isStackable } from "@neverquest/types/type-guards";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useMerchantTradeItem() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      (item: InventoryItem, type: "purchase" | "sale") => {
        const get = getSnapshotGetter(snapshot);

        const merchantInventoryValue = get(merchantInventory);
        const isPurchase = type === "purchase";

        if (isPurchase) {
          if (isStackable(item)) {
            const { stack, type } = item;

            if (stack === 1) {
              set(merchantInventory, (current) =>
                current.filter(({ item: { id } }) => id !== item.id),
              );
            } else {
              const merchantStackIndex = merchantInventoryValue.findIndex(
                ({ item }) => isStackable(item) && item.type === type,
              );

              set(merchantInventory, (current) => [
                ...current.slice(0, merchantStackIndex),
                { isReturned: true, item: { ...item, stack: item.stack - 1 } },
                ...current.slice(merchantStackIndex + 1),
              ]);
            }
          } else {
            set(merchantInventory, (current) =>
              current.filter(({ item: { id } }) => id !== item.id),
            );
          }

          set(hasBoughtFromMerchant, true);
        } else {
          if (isStackable(item)) {
            const { type } = item;

            const stack = merchantInventoryValue.find(
              (current) => isStackable(current.item) && current.item.type === type,
            );

            if (stack === undefined) {
              set(merchantInventory, (current) =>
                current.concat({ isReturned: true, item: { ...item, stack: 1 } }),
              );
            } else if (isStackable(stack.item)) {
              const stackIndex = merchantInventoryValue.findIndex(
                ({ item }) => isStackable(item) && item.type === type,
              );
              const { item: merchantItem } = stack;

              set(merchantInventory, (current) => [
                ...current.slice(0, stackIndex),
                { isReturned: true, item: { ...merchantItem, stack: merchantItem.stack + 1 } },
                ...current.slice(stackIndex + 1),
              ]);
            }
          } else {
            set(merchantInventory, (current) =>
              current.concat({
                isReturned: true,
                item: isGear(item) ? { ...item, isEquipped: false } : item,
              }),
            );
          }
        }
      },
    [],
  );
}

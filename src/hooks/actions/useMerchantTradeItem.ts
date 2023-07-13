import { useRecoilCallback } from "recoil";

import { hasBoughtFromMerchant, merchantInventory } from "@neverquest/state/caravan";
import type { Item } from "@neverquest/types";
import type { ItemTrade } from "@neverquest/types/props";
import { isConsumable, isGear } from "@neverquest/types/type-guards";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useMerchantTradeItem() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      (item: Item, type: ItemTrade) => {
        const get = getSnapshotGetter(snapshot);

        const merchantInventoryValue = get(merchantInventory);
        const isPurchase = type === "purchase";

        if (isPurchase) {
          if (isConsumable(item)) {
            const { stack, type } = item;

            if (stack === 1) {
              set(merchantInventory, (current) =>
                current.filter(({ item: { id } }) => id !== item.id)
              );
            } else {
              const merchantStackIndex = merchantInventoryValue.findIndex(
                ({ item }) => isConsumable(item) && item.type === type
              );

              set(merchantInventory, (current) => [
                ...current.slice(0, merchantStackIndex),
                { isReturned: true, item: { ...item, stack: item.stack - 1 } },
                ...current.slice(merchantStackIndex + 1),
              ]);
            }
          } else {
            set(merchantInventory, (current) =>
              current.filter(({ item: { id } }) => id !== item.id)
            );
          }

          set(hasBoughtFromMerchant, true);
        } else {
          if (isConsumable(item)) {
            const { type } = item;

            const stack = merchantInventoryValue.find(
              (current) => isConsumable(current.item) && current.item.type === type
            );

            if (stack === undefined) {
              set(merchantInventory, (current) =>
                current.concat({ isReturned: true, item: { ...item, stack: 1 } })
              );
            } else if (isConsumable(stack.item)) {
              const stackIndex = merchantInventoryValue.findIndex(
                ({ item }) => isConsumable(item) && item.type === type
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
              })
            );
          }
        }
      },
    []
  );
}

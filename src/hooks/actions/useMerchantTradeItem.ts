import { useRecoilCallback } from "recoil";

import { merchantInventory } from "@neverquest/state/caravan";
import type { InventoryItem } from "@neverquest/types";
import { isGear } from "@neverquest/types/type-guards";

export function useMerchantTradeItem() {
  return useRecoilCallback(
    ({ set }) =>
      (item: InventoryItem, type: "purchase" | "sale") => {
        if (type === "purchase") {
          set(merchantInventory, (current) => current.filter(({ item: { ID } }) => ID !== item.ID));
        } else {
          set(merchantInventory, (current) =>
            current.concat({
              isReturned: true,
              item: isGear(item) ? { ...item, isEquipped: false } : item,
            }),
          );
        }
      },
    [],
  );
}

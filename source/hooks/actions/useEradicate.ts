import { useRecoilCallback } from "recoil";

import { merchantInventory } from "@neverquest/state/caravan";
import { ammunition, ammunitionCapacity, infusion, infusionLevel } from "@neverquest/state/items";
import type { MerchantInventoryItem } from "@neverquest/types";
import { isInfusableItem, isRelicItem } from "@neverquest/types/type-guards";

export function useEradicate() {
  return useRecoilCallback(
    ({ reset, set }) =>
      (item: MerchantInventoryItem) => {
        set(merchantInventory, (currentMerchantInventory) =>
          currentMerchantInventory.map((merchantItem) => {
            if (merchantItem.ID === item.ID) {
              return { ...merchantItem, isEradicated: true };
            }

            return merchantItem;
          }),
        );

        if (isInfusableItem(item)) {
          reset(infusion(item.name));
          reset(infusionLevel(item.name));
        }

        if (isRelicItem(item) && item.name === "ammunition pouch") {
          reset(ammunition);
          reset(ammunitionCapacity);
        }
      },
    [],
  );
}

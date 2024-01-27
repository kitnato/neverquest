import { useRecoilCallback } from "recoil";

import { inventory } from "@neverquest/state/inventory";
import {
  ammunition,
  ammunitionCapacity,
  infusion,
  infusionLevel,
  isWeaving,
} from "@neverquest/state/items";
import type { InventoryItem } from "@neverquest/types";
import { isInfusableItem, isRelicItem } from "@neverquest/types/type-guards";

export function useDiscard() {
  return useRecoilCallback(
    ({ reset, set }) =>
      (item: InventoryItem) => {
        set(inventory, (currentInventory) =>
          currentInventory.filter(({ ID: currentItemID }) => currentItemID !== item.ID),
        );

        if (isInfusableItem(item)) {
          reset(infusion(item.name));
          reset(infusionLevel(item.name));
        }

        if (isRelicItem(item)) {
          if (item.name === "ammunition pouch") {
            reset(ammunition);
            reset(ammunitionCapacity);
          }

          if (item.name === "perpetual loom") {
            reset(isWeaving);
          }
        }
      },
    [],
  );
}

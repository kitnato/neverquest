import { useRecoilCallback } from "recoil";

import { useToggleEquipItem } from "@neverquest/hooks/actions/useToggleEquipItem";
import {
  ammunition,
  ammunitionCapacity,
  infusion,
  infusionLevel,
  tears,
} from "@neverquest/state/items";
import type { InventoryItem } from "@neverquest/types";
import { isInfusableItem, isRelicItem } from "@neverquest/types/type-guards";

export function useNeutralize() {
  const toggleEquipItem = useToggleEquipItem();

  return useRecoilCallback(
    ({ reset }) =>
      ({ isEradicated = false, item }: { isEradicated?: boolean; item: InventoryItem }) => {
        if (isInfusableItem(item) && isEradicated) {
          const { name } = item;

          reset(infusion(name));
          reset(infusionLevel(name));
        }

        if (isRelicItem(item)) {
          const { name } = item;

          toggleEquipItem({ forceEquip: false, item });

          if (isEradicated) {
            if (name === "ammunition pouch") {
              reset(ammunition);
              reset(ammunitionCapacity);
            }

            if (name === "lacrimatory") {
              reset(tears);
            }
          }
        }
      },
    [toggleEquipItem],
  );
}

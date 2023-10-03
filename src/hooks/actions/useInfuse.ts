import { useRecoilCallback } from "recoil";

import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { inventory } from "@neverquest/state/inventory";
import { infusionCurrent, infusionMaximum, infusionStep, ownedItem } from "@neverquest/state/items";

import type { TrinketItemInfusable } from "@neverquest/types";
import type { Trinket } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useInfuse() {
  const transactEssence = useTransactEssence();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      (trinket: Trinket) => {
        const get = getSnapshotGetter(snapshot);

        const ownedTrinket = get(ownedItem(trinket));

        if (ownedTrinket === null) {
          return;
        }

        const infusionStepValue = get(infusionStep(trinket));
        const infusionCurrentState = infusionCurrent(trinket);
        const newInfusion = get(infusionCurrentState) + infusionStepValue;

        if (newInfusion >= get(infusionMaximum(trinket))) {
          set(inventory, (currentInventory) =>
            currentInventory.map((currentItem) => {
              if (currentItem.id === ownedTrinket.id) {
                return {
                  ...currentItem,
                  level: (currentItem as TrinketItemInfusable).level + 1,
                };
              }

              return currentItem;
            }),
          );

          reset(infusionCurrentState);
        } else {
          set(infusionCurrentState, newInfusion);
        }

        transactEssence(-infusionStepValue);
      },
    [transactEssence],
  );
}

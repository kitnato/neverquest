import { useRecoilCallback } from "recoil";

import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { inventory } from "@neverquest/state/inventory";
import {
  canAffordInfusion,
  monkeyPawInfusion,
  monkeyPawInfusionStep,
  monkeyPawMaximum,
  ownedItem,
} from "@neverquest/state/items";

import type { TrinketItemMonkeyPaw } from "@neverquest/types";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useMonkeyPawInfuse() {
  const transactEssence = useTransactEssence();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const ownedMonkeyPaw = get(ownedItem("monkey paw"));

        if (ownedMonkeyPaw === null) {
          return;
        }

        if (get(canAffordInfusion)) {
          const monkeyPawInfusionStepValue = get(monkeyPawInfusionStep);
          const newInfusion = get(monkeyPawInfusion) + monkeyPawInfusionStepValue;

          if (newInfusion >= get(monkeyPawMaximum)) {
            set(inventory, (currentInventory) =>
              currentInventory.map((currentItem) => {
                if (currentItem.id === ownedMonkeyPaw.id) {
                  return {
                    ...currentItem,
                    level: (currentItem as TrinketItemMonkeyPaw).level + 1,
                  };
                }

                return currentItem;
              }),
            );

            reset(monkeyPawInfusion);
          } else {
            set(monkeyPawInfusion, newInfusion);
          }

          transactEssence(-monkeyPawInfusionStepValue);
        }
      },
    [transactEssence],
  );
}

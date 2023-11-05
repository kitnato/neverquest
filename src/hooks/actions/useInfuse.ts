import { useRecoilCallback } from "recoil";

import { INFUSABLE_LEVEL_MAXIMUM } from "@neverquest/data/inventory";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { inventory, ownedItem } from "@neverquest/state/inventory";
import {
  infusionCurrent,
  infusionLevel,
  infusionMaximum,
  infusionStep,
} from "@neverquest/state/items";

import { isInfusableItem } from "@neverquest/types/type-guards";
import type { Infusable } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useInfuse() {
  const transactEssence = useTransactEssence();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      (infusable: Infusable) => {
        const get = getSnapshotGetter(snapshot);

        const ownedInfusable = get(ownedItem(infusable));

        if (ownedInfusable === null) {
          return;
        }

        if (get(infusionLevel(infusable)) >= INFUSABLE_LEVEL_MAXIMUM) {
          return;
        }

        const infusionStepValue = get(infusionStep(infusable));

        if (infusionStepValue === 0) {
          return;
        }

        const infusionCurrentState = infusionCurrent(infusable);
        const newInfusion = get(infusionCurrentState) + infusionStepValue;

        if (newInfusion >= get(infusionMaximum(infusable))) {
          set(inventory, (currentInventory) =>
            currentInventory.map((currentItem) => {
              if (currentItem.id === ownedInfusable.id && isInfusableItem(currentItem)) {
                return {
                  ...currentItem,
                  level: currentItem.level + 1,
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

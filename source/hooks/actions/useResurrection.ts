import { useRecoilCallback } from "recoil";

import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { inventory, ownedItem } from "@neverquest/state/inventory";
import { healthMaximumPoisoned } from "@neverquest/state/reserves";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useResurrection() {
  const changeHealth = useChangeHealth();
  const progressQuest = useProgressQuest();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const healthMaximumPoisonedValue = get(healthMaximumPoisoned);
        const ownedItemPhylactery = get(ownedItem("phylactery"));

        if (ownedItemPhylactery !== undefined) {
          set(inventory, (currentInventory) =>
            currentInventory.filter(({ ID: itemID }) => itemID !== ownedItemPhylactery.ID),
          );

          progressQuest({ quest: "resurrecting" });

          changeHealth({
            contents: {
              color: "text-success",
              value: "RESURRECTED",
            },
            value: healthMaximumPoisonedValue,
          });
        }
      },
    [changeHealth, progressQuest],
  );
}

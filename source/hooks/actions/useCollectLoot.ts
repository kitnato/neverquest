import { useRecoilCallback } from "recoil";

import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { acquiredItems } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { essenceLoot, hasLooted, itemsLoot } from "@neverquest/state/resources";
import type { InventoryItem } from "@neverquest/types";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useCollectLoot() {
  const acquireItem = useAcquireItem();
  const progressQuest = useProgressQuest();
  const transactEssence = useTransactEssence();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const itemsLootValue = get(itemsLoot);

        transactEssence(get(essenceLoot));

        set(isShowing("attributes"), true);

        if (itemsLootValue.length > 0) {
          const acquiredFittingItems = itemsLootValue
            .map((item) => acquireItem(item) === "noFit" && item)
            .filter(Boolean) as InventoryItem[];
          const acquiredItemsIDs = new Set(acquiredFittingItems.map(({ ID }) => ID));

          set(itemsLoot, (currentItemsLoot) =>
            currentItemsLoot.filter(({ ID }) => !acquiredItemsIDs.has(ID)),
          );

          set(acquiredItems, (currentAcquiredItems) => [
            ...currentAcquiredItems,
            ...acquiredFittingItems,
          ]);
        }

        reset(essenceLoot);
        set(hasLooted, true);

        progressQuest({ quest: "looting" });
      },
    [acquireItem, progressQuest, transactEssence],
  );
}

import { useRecoilCallback } from "recoil";

import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { isShowing } from "@neverquest/state/isShowing";
import { essenceLoot, hasLooted, itemsLoot } from "@neverquest/state/resources";
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
          const acquiredItemIDs = new Set(
            itemsLootValue.map((item) => (acquireItem(item) === "noFit" ? undefined : item.ID)),
          );

          set(itemsLoot, (currentItemsLoot) =>
            currentItemsLoot.filter(({ ID }) => !acquiredItemIDs.has(ID)),
          );
        }

        reset(essenceLoot);
        set(hasLooted, true);

        progressQuest({ quest: "looting" });
      },
    [acquireItem, progressQuest, transactEssence],
  );
}

import { useRecoilCallback } from "recoil";

import { useProgressQuest } from "./useProgressQuest";
import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { isShowing } from "@neverquest/state/isShowing";
import { essenceLoot, itemsLoot } from "@neverquest/state/resources";
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

        set(isShowing("capabilities"), true);

        if (itemsLootValue.length > 0) {
          const acquiredItemIDs = itemsLootValue.map((current) =>
            acquireItem(current) !== "noFit" ? current.id : null,
          );

          set(itemsLoot, (current) => current.filter(({ id }) => !acquiredItemIDs.includes(id)));
        }

        reset(essenceLoot);

        progressQuest({ quest: "looting" });
      },
    [acquireItem, progressQuest, transactEssence],
  );
}

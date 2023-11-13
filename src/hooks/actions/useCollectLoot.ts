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

        set(isShowing("attributes"), true);

        if (itemsLootValue.length > 0) {
          const acquiredItemIDs = new Set(
            itemsLootValue.map((current) =>
              acquireItem(current) === "noFit" ? undefined : current.ID,
            ),
          );

          set(itemsLoot, (current) => current.filter(({ ID }) => !acquiredItemIDs.has(ID)));
        }

        reset(essenceLoot);

        progressQuest({ quest: "looting" });
      },
    [acquireItem, progressQuest, transactEssence],
  );
}

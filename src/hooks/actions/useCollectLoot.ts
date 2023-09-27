import { useRecoilCallback } from "recoil";

import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { isShowing } from "@neverquest/state/isShowing";
import { essenceLoot, itemsLoot } from "@neverquest/state/resources";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useCollectLoot() {
  const acquireItem = useAcquireItem();
  const transactEssence = useTransactEssence();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const itemsLootValue = get(itemsLoot);

        transactEssence(get(essenceLoot));

        set(isShowing("capabilities"), true);

        reset(essenceLoot);

        if (itemsLootValue.length > 0) {
          const acquiredItemIDs = itemsLootValue.map((current) =>
            acquireItem(current) !== "noFit" ? current.id : null,
          );

          set(itemsLoot, (current) => current.filter(({ id }) => !acquiredItemIDs.includes(id)));
        }

        return true;
      },
    [acquireItem, transactEssence],
  );
}

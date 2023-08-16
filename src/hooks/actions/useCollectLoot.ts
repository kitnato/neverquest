import { useRecoilCallback } from "recoil";

import { useAcquireItem } from "@neverquest/hooks/actions/useAcquireItem";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { coinsLoot, essenceLoot, itemsLoot, scrapLoot } from "@neverquest/state/resources";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useCollectLoot() {
  const acquireItem = useAcquireItem();
  const transactResources = useTransactResources();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      () => {
        const get = getSnapshotGetter(snapshot);

        const itemsLootValue = get(itemsLoot);

        transactResources({
          coinsDifference: get(coinsLoot),
          essenceDifference: get(essenceLoot),
          scrapDifference: get(scrapLoot),
        });

        reset(coinsLoot);
        reset(essenceLoot);
        reset(scrapLoot);

        if (itemsLootValue.length > 0) {
          const acquiredItemIDs = itemsLootValue.map((item) =>
            acquireItem(item) !== "noFit" ? item.id : null,
          );

          set(itemsLoot, (current) => current.filter(({ id }) => !acquiredItemIDs.includes(id)));
        }

        return true;
      },
    [acquireItem, transactResources],
  );
}

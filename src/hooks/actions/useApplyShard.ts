import { useRecoilCallback } from "recoil";

import { canApplyShard, inventory, weapon } from "@neverquest/state/inventory";
import type { ShardItem } from "@neverquest/types";
import { isWeapon } from "@neverquest/types/type-guards";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useApplyShard() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      (shard: ShardItem) => {
        const get = getSnapshotGetter(snapshot);

        if (get(canApplyShard)) {
          const weaponValue = get(weapon);

          set(inventory, (current) =>
            current
              .filter((current) => current.id !== shard.id)
              .map((item) => {
                if (isWeapon(item) && item.id === weaponValue.id) {
                  return { ...item, shards: item.shards.concat(shard) };
                }

                return item;
              }),
          );
        }
      },
    [],
  );
}

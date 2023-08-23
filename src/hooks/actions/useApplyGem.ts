import { useRecoilCallback } from "recoil";

import { canApplyGem, inventory, weapon } from "@neverquest/state/inventory";
import type { GemItem } from "@neverquest/types";
import { isWeapon } from "@neverquest/types/type-guards";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useApplyGem() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      (gem: GemItem) => {
        const get = getSnapshotGetter(snapshot);

        if (get(canApplyGem)) {
          const weaponValue = get(weapon);

          set(inventory, (current) =>
            current
              .filter((current) => current.id !== gem.id)
              .map((item) => {
                if (isWeapon(item) && item.id === weaponValue.id) {
                  return { ...item, gems: item.gems.concat(gem) };
                }

                return item;
              }),
          );
        }
      },
    [],
  );
}

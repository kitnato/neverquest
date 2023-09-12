import { useRecoilCallback } from "recoil";

import { GEM_FITTING_COST } from "@neverquest/data/inventory";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { armor, canApplyGem, inventory, shield, weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import type { GemItem } from "@neverquest/types";
import { isGear } from "@neverquest/types/type-guards";
import type { Gear } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useApplyGem() {
  const transactResources = useTransactResources();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      ({ gem, slot }: { gem: GemItem; slot: Gear }) => {
        const get = getSnapshotGetter(snapshot);

        if (get(canApplyGem(slot))) {
          const { gems, id } = (() => {
            switch (slot) {
              case "armor": {
                set(isShowing("thorns"), true);

                return get(armor);
              }

              case "shield": {
                return get(shield);
              }

              default: {
                return get(weapon);
              }
            }
          })();

          set(inventory, (current) =>
            current
              .filter((current) => current.id !== gem.id)
              .map((item) => {
                if (isGear(item) && item.id === id) {
                  return { ...item, gems: item.gems.concat(gem) };
                }

                return item;
              }),
          );

          transactResources({ scrapDifference: GEM_FITTING_COST[gems.length] ?? 0 });
        }
      },
    [transactResources],
  );
}

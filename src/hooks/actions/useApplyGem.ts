import { useRecoilCallback } from "recoil";

import { GEM_FITTING_COST } from "@neverquest/data/items";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import { armor, canApplyGem, shield, weapon } from "@neverquest/state/gear";
import { inventory } from "@neverquest/state/inventory";
import type { GemItem } from "@neverquest/types";
import { isGearItem } from "@neverquest/types/type-guards";
import { GEAR_TYPES, type Gear } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useApplyGem() {
  const progressQuest = useProgressQuest();
  const transactEssence = useTransactEssence();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      ({ gem, slot }: { gem: GemItem; slot: Gear }) => {
        const get = getSnapshotGetter(snapshot);

        if (get(canApplyGem(slot))) {
          const equippedGear = {
            armor: get(armor),
            shield: get(shield),
            weapon: get(weapon),
          };

          const { gems, ID } = equippedGear[slot];

          set(inventory, (currentInventory) =>
            currentInventory
              .filter(({ ID: itemID }) => itemID !== gem.ID)
              .map((item) => {
                if (isGearItem(item) && item.ID === ID) {
                  return { ...item, gems: [...item.gems, gem] };
                }

                return item;
              }),
          );

          transactEssence(-(GEM_FITTING_COST[gems.length] ?? 0));

          progressQuest({ quest: "gemsApplying" });

          if (
            GEAR_TYPES.filter((gear) => gear !== slot).every(
              (gear) => equippedGear[gear].gems.length > 0,
            )
          ) {
            progressQuest({ quest: "gemsApplyingAll" });
          }
        }
      },
    [progressQuest, transactEssence],
  );
}

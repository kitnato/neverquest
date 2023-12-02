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

          set(inventory, (current) =>
            current
              .filter((current) => current.ID !== gem.ID)
              .map((current) => {
                if (isGearItem(current) && current.ID === ID) {
                  return { ...current, gems: [...current.gems, gem] };
                }

                return current;
              }),
          );

          transactEssence(-(GEM_FITTING_COST[gems.length] ?? 0));

          progressQuest({ quest: "gemsApplying" });

          if (
            GEAR_TYPES.filter((current) => current !== slot).every(
              (current) => equippedGear[current].gems.length > 0,
            )
          ) {
            progressQuest({ quest: "gemsApplyingAll" });
          }
        }
      },
    [progressQuest, transactEssence],
  );
}

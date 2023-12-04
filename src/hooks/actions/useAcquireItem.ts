import { useRecoilCallback } from "recoil";

import { ARMOR_NONE, SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/gear";
import { useCanFit } from "@neverquest/hooks/actions/useCanFit";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { armor, shield, weapon } from "@neverquest/state/gear";
import { acquiredItems, inventory, notifyOverEncumbrance } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { autoEquip } from "@neverquest/state/settings";
import { isSkillAcquired } from "@neverquest/state/skills";
import { isTraitAcquired } from "@neverquest/state/traits";
import type { InventoryItem } from "@neverquest/types";
import {
  isArmor,
  isGearItem,
  isGemItem,
  isMelee,
  isRanged,
  isShield,
  isTrinketItem,
} from "@neverquest/types/type-guards";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useAcquireItem() {
  const canFit = useCanFit();
  const progressQuest = useProgressQuest();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      (item: InventoryItem): "autoEquip" | "noFit" | "success" => {
        const get = getSnapshotGetter(snapshot);

        if (!canFit(item.weight)) {
          set(notifyOverEncumbrance, true);

          return "noFit";
        }

        if (isTrinketItem(item) && item.name === "knapsack") {
          set(isShowing("weight"), true);
        } else {
          set(acquiredItems, (currentAcquiredItems) => [...currentAcquiredItems, item]);
        }

        if (isGemItem(item)) {
          progressQuest({ quest: "acquiringGems" });
        }

        if (isTrinketItem(item) && item.name === "antique coin") {
          progressQuest({ quest: "acquiringAntiqueCoin" });
        }

        set(inventory, (currentInventory) => [...currentInventory, item]);

        const isShieldUnequipped = get(shield).name === SHIELD_NONE.name;
        const weaponValue = get(weapon);

        if (isGearItem(item)) {
          if (isMelee(item) && item.grip === "two-handed") {
            progressQuest({ quest: "acquiringTwoHanded" });
          }

          if (isRanged(item)) {
            progressQuest({ quest: "acquiringRanged" });
          }

          if (
            get(autoEquip) &&
            ((get(armor).ID === ARMOR_NONE.ID && isArmor(item)) ||
              // Acquiring a shield while no shield equipped and not wielding a ranged or two-handed weapon (unless colossus).
              (isShieldUnequipped && isShield(item) && !isRanged(weaponValue)) ||
              get(isTraitAcquired("colossus")) ||
              // Acquiring a weapon while no weapon equipped, and if ranged or two-handed, no shield equipped.
              (weaponValue.ID === WEAPON_NONE.ID &&
                ((isMelee(item) && item.grip === "one-handed") ||
                  get(isTraitAcquired("colossus")) ||
                  (((isMelee(item) && item.grip === "two-handed") ||
                    (get(isSkillAcquired("archery")) && isRanged(item))) &&
                    isShieldUnequipped))))
          ) {
            return "autoEquip";
          }
        }

        return "success";
      },
    [canFit, progressQuest],
  );
}

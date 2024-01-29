import { useRecoilCallback } from "recoil";

import { useCanFit } from "@neverquest/hooks/actions/useCanFit";
import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { armor, shield, weapon } from "@neverquest/state/gear";
import { acquiredItems, inventory, notifyOverEncumbrance } from "@neverquest/state/inventory";
import { isSkillAcquired } from "@neverquest/state/skills";
import { isTraitAcquired } from "@neverquest/state/traits";
import { isShowing } from "@neverquest/state/ui";
import type { InventoryItem } from "@neverquest/types";
import {
  isArmor,
  isGearItem,
  isGemItem,
  isMelee,
  isRanged,
  isRelicItem,
  isShield,
  isUnarmed,
  isUnarmored,
  isUnshielded,
} from "@neverquest/types/type-guards";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useAcquireItem() {
  const canFit = useCanFit();
  const progressQuest = useProgressQuest();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      (item: InventoryItem): "equip" | "failure" | "success" => {
        const get = getSnapshotGetter(snapshot);

        if (!canFit(item.weight)) {
          set(notifyOverEncumbrance, true);

          return "failure";
        }

        if (isRelicItem(item) && item.name === "knapsack") {
          set(isShowing("weight"), true);
        } else {
          set(acquiredItems, (currentAcquiredItems) => [...currentAcquiredItems, item]);
        }

        if (isGemItem(item)) {
          progressQuest({ quest: "acquiringGems" });
        }

        if (isRelicItem(item)) {
          if (item.name === "memento") {
            progressQuest({ quest: "acquiringMemento" });
          }

          if (item.name === "familiar") {
            progressQuest({ quest: "acquiringFamiliar" });
          }
        }

        set(inventory, (currentInventory) => [...currentInventory, item]);

        const isShieldUnequipped = isUnshielded(get(shield));
        const weaponValue = get(weapon);

        if (isGearItem(item)) {
          if (isMelee(item) && item.grip === "two-handed") {
            progressQuest({ quest: "acquiringTwoHanded" });
          }

          if (isRanged(item)) {
            progressQuest({ quest: "acquiringRanged" });
          }

          if (
            (isUnarmored(get(armor)) && isArmor(item)) ||
            // Acquiring a shield while no shield equipped and not wielding a ranged weapon nor two-handed weapon, unless colossus.
            (isShieldUnequipped &&
              isShield(item) &&
              !isRanged(weaponValue) &&
              isMelee(weaponValue) &&
              (weaponValue.grip === "one-handed" || get(isTraitAcquired("colossus")))) ||
            // Acquiring a weapon while no weapon equipped, and if ranged or two-handed, no shield equipped.
            (isUnarmed(weaponValue) &&
              ((isMelee(item) && item.grip === "one-handed") ||
                get(isTraitAcquired("colossus")) ||
                (((isMelee(item) && item.grip === "two-handed") ||
                  (get(isSkillAcquired("archery")) && isRanged(item))) &&
                  isShieldUnequipped)))
          ) {
            return "equip";
          }
        }

        return "success";
      },
    [canFit, progressQuest],
  );
}

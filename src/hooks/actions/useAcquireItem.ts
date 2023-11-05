import { useRecoilCallback } from "recoil";

import { ARMOR_NONE, SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/inventory";
import { armor, shield, weapon } from "@neverquest/state/gear";
import {
  canFit,
  inventory,
  itemsAcquired,
  notifyOverEncumbrance,
} from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { autoEquip } from "@neverquest/state/settings";
import { isSkillAcquired } from "@neverquest/state/skills";
import { isTraitAcquired } from "@neverquest/state/traits";
import type { InventoryItem } from "@neverquest/types";
import {
  isArmor,
  isGear,
  isMelee,
  isRanged,
  isShield,
  isTrinketItem,
} from "@neverquest/types/type-guards";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useAcquireItem() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      (item: InventoryItem): "autoEquip" | "noFit" | "success" => {
        const get = getSnapshotGetter(snapshot);

        if (!get(canFit(item.weight))) {
          set(notifyOverEncumbrance, true);

          return "noFit";
        }

        if (isTrinketItem(item) && item.name === "knapsack") {
          set(isShowing("weight"), true);
        } else {
          set(itemsAcquired, (current) => [...current, item]);
        }

        set(inventory, (current) => current.concat(item));

        const isShieldUnequipped = get(shield).name === SHIELD_NONE.name;
        const weaponValue = get(weapon);

        if (
          isGear(item) &&
          get(autoEquip) &&
          ((get(armor).name === ARMOR_NONE.name && isArmor(item)) ||
            // Acquiring a shield while no shield equipped and not wielding a ranged or two-handed weapon (unless colossus).
            (isShieldUnequipped && isShield(item) && !isRanged(weaponValue)) ||
            get(isTraitAcquired("colossus")) ||
            // Acquiring a weapon while no weapon equipped, and if ranged or two-handed, no shield equipped.
            (weaponValue.name === WEAPON_NONE.name &&
              ((isMelee(item) && item.grip === "one-handed") ||
                get(isTraitAcquired("colossus")) ||
                (((isMelee(item) && item.grip === "two-handed") ||
                  (get(isSkillAcquired("archery")) && isRanged(item))) &&
                  isShieldUnequipped))))
        ) {
          return "autoEquip";
        }

        return "success";
      },
    [],
  );
}

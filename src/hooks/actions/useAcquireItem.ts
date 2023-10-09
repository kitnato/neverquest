import { useRecoilCallback } from "recoil";

import { ARMOR_NONE, KNAPSACK_SIZE, SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/inventory";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { useTransactEssence } from "@neverquest/hooks/actions/useTransactEssence";
import {
  canFit,
  encumbranceMaximum,
  hasKnapsack,
  inventory,
  itemsAcquired,
  notifyOverEncumbrance,
} from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { armor, shield, weapon } from "@neverquest/state/items";
import { autoEquip } from "@neverquest/state/settings";
import { isSkillAcquired } from "@neverquest/state/skills";
import type { InventoryItem } from "@neverquest/types";
import {
  isArmor,
  isGear,
  isMelee,
  isRanged,
  isShield,
  isTrinket,
} from "@neverquest/types/type-guards";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useAcquireItem() {
  const toggleEquipGear = useToggleEquipGear();
  const transactEssence = useTransactEssence();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      (item: InventoryItem): "autoEquip" | "noFit" | "success" => {
        const get = getSnapshotGetter(snapshot);

        if (!get(canFit(item.weight))) {
          set(notifyOverEncumbrance, true);

          return "noFit";
        }

        if (isTrinket(item) && item.name === "knapsack") {
          set(encumbranceMaximum, (current) => current + KNAPSACK_SIZE);
          set(hasKnapsack, true);
          set(isShowing("weight"), true);

          return "success";
        }

        set(inventory, (current) => current.concat(item));
        set(itemsAcquired, (current) => [...current, item]);

        if (
          isGear(item) &&
          get(autoEquip) &&
          ((get(armor) === ARMOR_NONE && isArmor(item)) ||
            (get(shield) === SHIELD_NONE && isShield(item)) ||
            (get(weapon) === WEAPON_NONE &&
              (isMelee(item) || (get(isSkillAcquired("archery")) && isRanged(item)))))
        ) {
          return "autoEquip";
        }

        return "success";
      },
    [toggleEquipGear, transactEssence],
  );
}

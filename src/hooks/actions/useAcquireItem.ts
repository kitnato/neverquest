import { useRecoilCallback } from "recoil";

import { ARMOR_NONE, KNAPSACK_SIZE, SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/inventory";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { attributes } from "@neverquest/state/attributes";
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
import { skills } from "@neverquest/state/skills";
import type { InventoryItem } from "@neverquest/types";
import { isArmor, isGear, isMelee, isRanged, isShield } from "@neverquest/types/type-guards";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useAcquireItem() {
  const toggleEquipGear = useToggleEquipGear();
  const transactResources = useTransactResources();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      (item: InventoryItem): "autoEquip" | "noFit" | "success" => {
        const get = getSnapshotGetter(snapshot);

        if (!get(canFit(item.weight))) {
          set(notifyOverEncumbrance, true);

          return "noFit";
        }

        set(itemsAcquired, (current) => [...current, item]);

        if (isGear(item)) {
          set(inventory, (current) => current.concat(item));

          if (
            get(autoEquip) &&
            ((get(armor) === ARMOR_NONE && isArmor(item)) ||
              (get(shield) === SHIELD_NONE && isShield(item)) ||
              (get(weapon) === WEAPON_NONE &&
                (isMelee(item) || (get(skills("archery")) && isRanged(item)))))
          ) {
            return "autoEquip";
          } else {
            return "success";
          }
        }

        const { type } = item;

        if (type === "knapsack") {
          set(encumbranceMaximum, (current) => current + KNAPSACK_SIZE);
          set(hasKnapsack, true);

          set(isShowing("weight"), true);
        } else {
          if (type === "antique coin") {
            set(isShowing("lootBonus"), true);

            set(attributes("luck"), (current) => ({ ...current, isUnlocked: true }));
          }

          if (type === "tome of power") {
            set(isShowing("lootBonusDetails"), true);
          }

          set(inventory, (current) => current.concat(item));
        }

        return "success";
      },
    [toggleEquipGear, transactResources],
  );
}

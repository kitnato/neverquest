import { useRecoilCallback } from "recoil";

import { ARMOR_NONE, KNAPSACK_SIZE, SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/inventory";
import { useToggleEquipGear } from "@neverquest/hooks/actions/useToggleEquipGear";
import { useTransactResources } from "@neverquest/hooks/actions/useTransactResources";
import { attributes } from "@neverquest/state/attributes";
import {
  armor,
  canFit,
  encumbranceMaximum,
  hasKnapsack,
  inventory,
  itemsAcquired,
  shield,
  weapon,
} from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { autoEquip } from "@neverquest/state/settings";
import type { Item } from "@neverquest/types";
import type { ItemAcquisition, ItemAcquisitionResult } from "@neverquest/types/props";
import {
  isArmor,
  isConsumable,
  isGear,
  isShard,
  isShield,
  isWeapon,
} from "@neverquest/types/type-guards";
import type { Consumable } from "@neverquest/types/unions";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useAcquireItem() {
  const toggleEquipGear = useToggleEquipGear();
  const transactResources = useTransactResources();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      (item: Item, type: ItemAcquisition): ItemAcquisitionResult => {
        const get = getSnapshotGetter(snapshot);

        const inventoryValue = get(inventory);

        let status: ItemAcquisitionResult = "noFit";

        const { coinPrice, id, weight } = item;

        if (!get(canFit(weight))) {
          return status;
        }

        if (isGear(item)) {
          if (
            get(autoEquip) &&
            ((get(armor) === ARMOR_NONE && isArmor(item)) ||
              (get(shield) === SHIELD_NONE && isShield(item)) ||
              (get(weapon) === WEAPON_NONE && isWeapon(item)))
          ) {
            status = "autoEquip";
          } else {
            status = "success";
          }

          set(inventory, (current) => current.concat(item));
        } else {
          const itemType = isShard(item) ? "shard" : item.type;

          if (itemType === "knapsack") {
            set(encumbranceMaximum, (current) => current + KNAPSACK_SIZE);
            set(hasKnapsack, true);

            set(isShowing("weight"), true);
          } else {
            if (itemType === "antique coin") {
              set(isShowing("lootBonus"), true);

              set(attributes("luck"), (current) => ({ ...current, isUnlocked: true }));
            }

            if (itemType === "tome of power") {
              set(isShowing("lootBonusDetails"), true);
            }

            if (isConsumable(item)) {
              set(itemsAcquired, (current) => [...current, { key: id, type: type as Consumable }]);

              const existingStack = inventoryValue.find(
                (current) => isConsumable(current) && current.type === itemType,
              );

              if (existingStack === undefined) {
                set(inventory, (current) => current.concat({ ...item, stack: 1 }));
              } else if (isConsumable(existingStack)) {
                const stackIndex = inventoryValue.findIndex(
                  (current) => isConsumable(current) && current.type === itemType,
                );

                set(inventory, (current) => [
                  ...current.slice(0, stackIndex),
                  { ...item, stack: existingStack.stack + 1 },
                  ...current.slice(stackIndex + 1),
                ]);
              }
            } else {
              set(inventory, (current) => current.concat(item));
            }
          }

          status = "success";
        }

        if (type === "purchase") {
          transactResources({ coinsDifference: -coinPrice });
        }

        return status;
      },
    [toggleEquipGear, transactResources],
  );
}

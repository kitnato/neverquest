import { useRecoilCallback } from "recoil";

import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { inventory } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { questProgress } from "@neverquest/state/quests";
import { isSkillAcquired } from "@neverquest/state/skills";
import { isTraitAcquired } from "@neverquest/state/traits";
import type { GearItem } from "@neverquest/types";
import {
  isArmor,
  isGearItem,
  isMelee,
  isRanged,
  isShield,
  isWeapon,
} from "@neverquest/types/type-guards";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useToggleEquipGear() {
  const progressQuest = useProgressQuest();

  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      (gearItem: GearItem) => {
        const get = getSnapshotGetter(snapshot);

        const { gearClass, ID, isEquipped, staminaCost } = gearItem;

        const isWeaponRanged = isRanged(gearItem);
        // eslint-disable-next-line unicorn/consistent-destructuring
        const isWeaponTwoHanded = isMelee(gearItem) && gearItem.grip === "two-handed";

        set(isShowing("statistics"), true);

        if (isArmor(gearItem) && !isEquipped) {
          if (gearClass === "heavy" && !get(isSkillAcquired("armorcraft"))) {
            return;
          }

          set(isShowing("armor"), true);
          set(isShowing("protection"), true);

          progressQuest({ quest: "equippingArmor" });
        }

        if (isShield(gearItem) && !isEquipped) {
          if (gearClass === "tower" && !get(isSkillAcquired("shieldcraft"))) {
            return;
          }

          set(isShowing("blockChance"), true);
          set(isShowing("offhand"), true);
          set(isShowing("stamina"), true);

          progressQuest({ quest: "equippingShield" });
        }

        if (isWeapon(gearItem) && !isEquipped) {
          if (isWeaponTwoHanded && !get(isSkillAcquired("siegecraft"))) {
            return;
          }

          if (isRanged(gearItem) && !get(isSkillAcquired("archery"))) {
            return;
          }

          if (staminaCost > 0) {
            set(isShowing("stamina"), true);
          }

          if (isWeaponRanged || isWeaponTwoHanded) {
            set(isShowing("offhand"), true);
          }

          set(isShowing("attackRateDetails"), true);
          set(isShowing("damageDetails"), true);
          set(isShowing("weapon"), true);

          progressQuest({ quest: "equippingWeapon" });
        }

        reset(questProgress("survivingNoGear"));

        set(inventory, (currentInventory) =>
          currentInventory.map((currentItem) => {
            if (isGearItem(currentItem)) {
              if (currentItem.ID === ID) {
                return {
                  ...currentItem,
                  isEquipped: !currentItem.isEquipped,
                };
              } else if (
                // Equipping a ranged or two-handed weapon while a shield is equipped.
                ((isWeaponRanged || isWeaponTwoHanded) &&
                  !isEquipped &&
                  isShield(currentItem) &&
                  currentItem.isEquipped) ||
                // Equipping a shield while a ranged or two-handed weapon is equipped.
                (isShield(gearItem) &&
                  !isEquipped &&
                  ((isMelee(currentItem) &&
                    currentItem.grip === "two-handed" &&
                    !get(isTraitAcquired("colossus"))) ||
                    isRanged(currentItem)) &&
                  currentItem.isEquipped) ||
                // Equipping in an already-occupied slot.
                (currentItem.isEquipped &&
                  !isEquipped &&
                  ((isArmor(currentItem) && isArmor(gearItem)) ||
                    (isShield(currentItem) && isShield(gearItem)) ||
                    (isWeapon(currentItem) && isWeapon(gearItem))))
              ) {
                return {
                  ...currentItem,
                  isEquipped: false,
                };
              }
            }

            return currentItem;
          }),
        );
      },
    [progressQuest],
  );
}

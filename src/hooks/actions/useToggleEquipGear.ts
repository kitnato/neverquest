import { useRecoilCallback } from "recoil";

import { isAttributeUnlocked } from "@neverquest/state/attributes";
import { inventory } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { isSkillAcquired } from "@neverquest/state/skills";
import { isTraitAcquired } from "@neverquest/state/traits";
import type { GearItem } from "@neverquest/types";
import {
  isArmor,
  isGear,
  isMelee,
  isRanged,
  isShield,
  isWeapon,
} from "@neverquest/types/type-guards";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useToggleEquipGear() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      (gearItem: GearItem) => {
        const get = getSnapshotGetter(snapshot);

        const { isEquipped, staminaCost } = gearItem;

        const isRangedWeapon = isRanged(gearItem);
        const isTwoHandedWeapon = isMelee(gearItem) && gearItem.grip === "two-handed";

        set(isShowing("statistics"), true);

        if (isArmor(gearItem) && !isEquipped) {
          if (gearItem.gearClass === "heavy" && !get(isSkillAcquired("armorcraft"))) {
            return;
          }

          set(isShowing("armor"), true);
          set(isShowing("protection"), true);

          if (get(isSkillAcquired("evasion")) && staminaCost) {
            set(isShowing("dodgePenalty"), true);
          }

          if (gearItem.deflection > 0) {
            set(isShowing("deflection"), true);
          }
        }

        if (isShield(gearItem) && !isEquipped) {
          if (gearItem.gearClass === "tower" && !get(isSkillAcquired("shieldcraft"))) {
            return;
          }

          set(isShowing("block"), true);
          set(isShowing("offhand"), true);
          set(isShowing("stamina"), true);
        }

        if (isWeapon(gearItem) && !isEquipped) {
          if (
            isMelee(gearItem) &&
            gearItem.grip === "two-handed" &&
            !get(isSkillAcquired("siegecraft"))
          ) {
            return;
          }

          if (isRanged(gearItem) && !get(isSkillAcquired("archery"))) {
            return;
          }

          if (staminaCost > 0) {
            set(isShowing("stamina"), true);
            set(isAttributeUnlocked("endurance"), { isUnlocked: true });
          }

          if (isRangedWeapon || isTwoHandedWeapon) {
            set(isShowing("offhand"), true);
          }

          set(isShowing("attackRateDetails"), true);
          set(isShowing("damageDetails"), true);
          set(isShowing("weapon"), true);
        }

        set(inventory, (currentInventory) =>
          currentInventory.map((currentItem) => {
            if (isGear(currentItem)) {
              if (currentItem.id === gearItem.id) {
                return {
                  ...currentItem,
                  isEquipped: !currentItem.isEquipped,
                };
              } else if (
                // Equipping a ranged or two-handed weapon while a shield is equipped.
                ((isRangedWeapon || isTwoHandedWeapon) &&
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
    [],
  );
}

import { useRecoilCallback } from "recoil";

import { attributes } from "@neverquest/state/attributes";
import { inventory } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import type { GearItem } from "@neverquest/types";
import { isArmor, isGear, isShield, isWeapon } from "@neverquest/types/type-guards";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useToggleEquipGear() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      (gear: GearItem) => {
        const get = getSnapshotGetter(snapshot);

        if (isArmor(gear)) {
          const { staminaCost } = gear;

          set(isShowing("armor"), true);
          set(isShowing("defense"), true);
          set(isShowing("protection"), true);

          if (get(skills("evasion")) && staminaCost) {
            set(isShowing("dodgePenalty"), true);
          }
        }

        if (isShield(gear)) {
          set(isShowing("block"), true);
          set(isShowing("defense"), true);
          set(isShowing("shield"), true);
        }

        if (isWeapon(gear)) {
          if (gear.staminaCost) {
            set(isShowing("stamina"), true);

            if (!get(attributes("endurance")).isUnlocked) {
              set(attributes("endurance"), (current) => ({
                ...current,
                isUnlocked: true,
              }));
            }
          }

          set(isShowing("attackRateDetails"), true);
          set(isShowing("damageDetails"), true);
          set(isShowing("weapon"), true);
        }

        set(inventory, (current) =>
          current.map((currentItem) => {
            if (isGear(currentItem)) {
              if (currentItem.id === gear.id) {
                return {
                  ...currentItem,
                  isEquipped: !currentItem.isEquipped,
                };
              } else if (
                currentItem.isEquipped &&
                !gear.isEquipped &&
                ((isArmor(currentItem) && isArmor(gear)) ||
                  (isShield(currentItem) && isShield(gear)) ||
                  (isWeapon(currentItem) && isWeapon(gear)))
              ) {
                return {
                  ...currentItem,
                  isEquipped: false,
                };
              }
            }

            return currentItem;
          })
        );
      },
    []
  );
}

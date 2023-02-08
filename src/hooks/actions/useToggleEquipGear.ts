import { useRecoilCallback } from "recoil";

import { attributes } from "@neverquest/state/attributes";
import { inventory } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { Gear } from "@neverquest/types";
import { AttributeType, ShowingType } from "@neverquest/types/enums";
import { isArmor, isGear, isShield, isWeapon } from "@neverquest/types/type-guards";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useToggleEquipGear() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      (idOrGear: string | Gear) => {
        const get = getSnapshotGetter(snapshot);

        let item;

        if (isGear(idOrGear)) {
          item = idOrGear;
        } else {
          item = get(inventory)[idOrGear].item;

          set(inventory, (current) => ({
            ...current,
            [idOrGear]: { ...current[idOrGear], isEquipped: !current[idOrGear].isEquipped },
          }));
        }

        if (isArmor(item)) {
          if (!get(isShowing(ShowingType.Armor))) {
            set(isShowing(ShowingType.Armor), true);
          }

          if (!get(isShowing(ShowingType.Protection))) {
            set(isShowing(ShowingType.Protection), true);
          }

          if (!get(isShowing(ShowingType.Deflection)) && item.deflectionChance) {
            set(isShowing(ShowingType.Deflection), true);
          }

          if (
            !get(isShowing(ShowingType.DodgeChanceDetails)) &&
            (item.penalty || item.staminaCost)
          ) {
            set(isShowing(ShowingType.DodgeChanceDetails), true);
          }
        }

        if (isShield(item)) {
          if (!get(isShowing(ShowingType.Shield))) {
            set(isShowing(ShowingType.Shield), true);
          }

          if (!get(isShowing(ShowingType.BlockChance))) {
            set(isShowing(ShowingType.BlockChance), true);
          }
        }

        if (isWeapon(item)) {
          if (!get(isShowing(ShowingType.Stamina)) && item.staminaCost > 0) {
            set(isShowing(ShowingType.Stamina), true);

            if (!get(attributes(AttributeType.Stamina)).isUnlocked) {
              set(attributes(AttributeType.Stamina), (current) => ({
                ...current,
                isUnlocked: true,
              }));
            }
          }

          if (!get(isShowing(ShowingType.AttackRateDetails))) {
            set(isShowing(ShowingType.AttackRateDetails), true);
          }

          if (!get(isShowing(ShowingType.DamageDetails))) {
            set(isShowing(ShowingType.DamageDetails), true);
          }

          if (!get(isShowing(ShowingType.Weapon))) {
            set(isShowing(ShowingType.Weapon), true);
          }
        }
      },
    []
  );
}

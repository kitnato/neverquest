import { useRecoilCallback } from "recoil";

import { attributes } from "@neverquest/state/attributes";
import {
  equippedArmor,
  equippedShield,
  equippedWeapon,
  inventory,
} from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { AttributeType, ShowingType } from "@neverquest/types/enums";
import { isArmor, isShield, isWeapon } from "@neverquest/types/type-guards";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useToggleEquipGear() {
  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      (id: string) => {
        const get = getSnapshotGetter(snapshot);

        const item = get(inventory)[id];

        let equippedGear = equippedArmor;

        if (isArmor(item)) {
          const { deflectionChance, staminaCost } = item;

          if (!get(isShowing(ShowingType.Armor))) {
            set(isShowing(ShowingType.Armor), true);
          }

          if (!get(isShowing(ShowingType.Protection))) {
            set(isShowing(ShowingType.Protection), true);
          }

          if (!get(isShowing(ShowingType.Deflection)) && deflectionChance) {
            set(isShowing(ShowingType.Deflection), true);
          }

          if (!get(isShowing(ShowingType.DodgeChanceDetails)) && staminaCost) {
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

          equippedGear = equippedShield;
        }

        if (isWeapon(item)) {
          if (!get(isShowing(ShowingType.Stamina)) && item.staminaCost) {
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

          equippedGear = equippedWeapon;
        }

        if (get(equippedGear) === id) {
          reset(equippedGear);
        } else {
          set(equippedGear, id);
        }
      },
    []
  );
}

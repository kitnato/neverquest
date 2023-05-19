import { type RecoilState, useRecoilCallback } from "recoil";

import { attributes } from "@neverquest/state/attributes";
import { equippedGearID, inventory } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { AttributeType, GearType, ShowingType } from "@neverquest/types/enums";
import { isArmor, isShield, isWeapon } from "@neverquest/types/type-guards";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useToggleEquipGear() {
  return useRecoilCallback(
    ({ reset, set, snapshot }) =>
      (id: string) => {
        const get = getSnapshotGetter(snapshot);

        const item = get(inventory)[id];

        const toggle = (slot: RecoilState<string | null>) => {
          if (get(slot) === id) {
            reset(slot);
          } else {
            set(slot, id);
          }
        };

        if (isArmor(item)) {
          const { staminaCost } = item;

          if (!get(isShowing(ShowingType.Armor))) {
            set(isShowing(ShowingType.Armor), true);
          }

          if (!get(isShowing(ShowingType.Protection))) {
            set(isShowing(ShowingType.Protection), true);
          }

          if (!get(isShowing(ShowingType.DodgeDetails)) && staminaCost) {
            set(isShowing(ShowingType.DodgeDetails), true);
          }

          if (!get(isShowing(ShowingType.GearComparisonArmor))) {
            set(isShowing(ShowingType.GearComparisonArmor), true);
          }

          toggle(equippedGearID(GearType.Armor));
        }

        if (isShield(item)) {
          if (!get(isShowing(ShowingType.Shield))) {
            set(isShowing(ShowingType.Shield), true);
          }

          if (!get(isShowing(ShowingType.Block))) {
            set(isShowing(ShowingType.Block), true);
          }

          if (!get(isShowing(ShowingType.GearComparisonShield))) {
            set(isShowing(ShowingType.GearComparisonShield), true);
          }

          toggle(equippedGearID(GearType.Shield));
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

          if (!get(isShowing(ShowingType.GearComparisonWeapon))) {
            set(isShowing(ShowingType.GearComparisonWeapon), true);
          }

          toggle(equippedGearID(GearType.Weapon));
        }
      },
    []
  );
}

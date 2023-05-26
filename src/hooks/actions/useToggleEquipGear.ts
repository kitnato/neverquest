import { type RecoilState, useRecoilCallback } from "recoil";

import { attributes } from "@neverquest/state/attributes";
import { equippedGearID, inventory } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { Attribute, GearType, Showing } from "@neverquest/types/enums";
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

          if (!get(isShowing(Showing.Armor))) {
            set(isShowing(Showing.Armor), true);
          }

          if (!get(isShowing(Showing.Protection))) {
            set(isShowing(Showing.Protection), true);
          }

          if (!get(isShowing(Showing.DodgeDetails)) && staminaCost) {
            set(isShowing(Showing.DodgeDetails), true);
          }

          if (!get(isShowing(Showing.GearComparisonArmor))) {
            set(isShowing(Showing.GearComparisonArmor), true);
          }

          toggle(equippedGearID(GearType.Armor));
        }

        if (isShield(item)) {
          if (!get(isShowing(Showing.Shield))) {
            set(isShowing(Showing.Shield), true);
          }

          if (!get(isShowing(Showing.Block))) {
            set(isShowing(Showing.Block), true);
          }

          if (!get(isShowing(Showing.GearComparisonShield))) {
            set(isShowing(Showing.GearComparisonShield), true);
          }

          toggle(equippedGearID(GearType.Shield));
        }

        if (isWeapon(item)) {
          if (!get(isShowing(Showing.Stamina)) && item.staminaCost) {
            set(isShowing(Showing.Stamina), true);

            if (!get(attributes(Attribute.Endurance)).isUnlocked) {
              set(attributes(Attribute.Endurance), (current) => ({
                ...current,
                isUnlocked: true,
              }));
            }
          }

          if (!get(isShowing(Showing.AttackRateDetails))) {
            set(isShowing(Showing.AttackRateDetails), true);
          }

          if (!get(isShowing(Showing.DamageDetails))) {
            set(isShowing(Showing.DamageDetails), true);
          }

          if (!get(isShowing(Showing.Weapon))) {
            set(isShowing(Showing.Weapon), true);
          }

          if (!get(isShowing(Showing.GearComparisonWeapon))) {
            set(isShowing(Showing.GearComparisonWeapon), true);
          }

          toggle(equippedGearID(GearType.Weapon));
        }
      },
    []
  );
}

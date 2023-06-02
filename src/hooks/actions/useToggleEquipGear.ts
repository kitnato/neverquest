import { type RecoilState, useRecoilCallback } from "recoil";

import { attributes } from "@neverquest/state/attributes";
import { equippedGearID, inventory } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { Attribute, GearType, Showing, Skill } from "@neverquest/types/enums";
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

          set(isShowing(Showing.Armor), true);
          set(isShowing(Showing.Defense), true);
          set(isShowing(Showing.GearComparisonArmor), true);
          set(isShowing(Showing.Protection), true);

          if (get(skills(Skill.Evasion)) && staminaCost) {
            set(isShowing(Showing.DodgePenalty), true);
          }

          toggle(equippedGearID(GearType.Armor));
        }

        if (isShield(item)) {
          set(isShowing(Showing.Block), true);
          set(isShowing(Showing.Defense), true);
          set(isShowing(Showing.GearComparisonShield), true);
          set(isShowing(Showing.Shield), true);

          toggle(equippedGearID(GearType.Shield));
        }

        if (isWeapon(item)) {
          if (item.staminaCost) {
            set(isShowing(Showing.Stamina), true);

            if (!get(attributes(Attribute.Endurance)).isUnlocked) {
              set(attributes(Attribute.Endurance), (current) => ({
                ...current,
                isUnlocked: true,
              }));
            }
          }

          set(isShowing(Showing.AttackRateDetails), true);
          set(isShowing(Showing.DamageDetails), true);
          set(isShowing(Showing.GearComparisonWeapon), true);
          set(isShowing(Showing.Weapon), true);

          toggle(equippedGearID(GearType.Weapon));
        }
      },
    []
  );
}

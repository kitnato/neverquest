import { type RecoilState, useRecoilCallback } from "recoil";

import { attributes } from "@neverquest/state/attributes";
import { equippedGearID, inventory } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
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

          set(isShowing("armor"), true);
          set(isShowing("defense"), true);
          set(isShowing("protection"), true);

          if (get(skills("evasion")) && staminaCost) {
            set(isShowing("dodgePenalty"), true);
          }

          toggle(equippedGearID("armor"));
        }

        if (isShield(item)) {
          set(isShowing("block"), true);
          set(isShowing("defense"), true);
          set(isShowing("shield"), true);

          toggle(equippedGearID("shield"));
        }

        if (isWeapon(item)) {
          if (item.staminaCost) {
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

          toggle(equippedGearID("weapon"));
        }
      },
    []
  );
}

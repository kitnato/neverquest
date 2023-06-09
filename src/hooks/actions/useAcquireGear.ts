import { useRecoilCallback } from "recoil";

import { ARMOR_NONE, SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/inventory";
import { armor, canFit, inventory, shield, weapon } from "@neverquest/state/inventory";
import { autoEquip } from "@neverquest/state/settings";
import type { Gear } from "@neverquest/types";
import { isArmor, isShield, isWeapon } from "@neverquest/types/type-guards";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export function useAcquireGear() {
  return useRecoilCallback(
    ({ set, snapshot }) =>
      (gear: Gear) => {
        const get = getSnapshotGetter(snapshot);

        const { weight } = gear;

        if (!get(canFit(weight))) {
          return null;
        }

        set(inventory, (current) => current.concat(gear));

        if (
          get(autoEquip) &&
          ((get(armor) === ARMOR_NONE && isArmor(gear)) ||
            (get(shield) === SHIELD_NONE && isShield(gear)) ||
            (get(weapon) === WEAPON_NONE && isWeapon(gear)))
        ) {
          return true;
        }

        return false;
      },
    []
  );
}

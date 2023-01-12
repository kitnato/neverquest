import { nanoid } from "nanoid";
import { useRecoilCallback } from "recoil";

import { ARMOR_NONE, SHIELD_NONE, WEAPON_NONE } from "@neverquest/data/gear";
import useToggleEquipGear from "@neverquest/hooks/actions/useToggleEquipGear";
import { armor, canFit, inventory, shield, weapon } from "@neverquest/state/inventory";
import { autoEquip } from "@neverquest/state/settings";
import { Gear } from "@neverquest/types";
import { isArmor, isShield, isWeapon } from "@neverquest/types/type-guards";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export default function () {
  const toggleEquipGear = useToggleEquipGear();

  return useRecoilCallback(
    ({ set, snapshot }) =>
      ({ gear }: { gear: Gear }) => {
        const get = getSnapshotGetter(snapshot);

        const id = nanoid();
        const key = nanoid();
        const { weight } = gear;

        if (!get(canFit(weight))) {
          return false;
        }

        let isEquipped = false;

        if (
          get(autoEquip) &&
          ((get(armor) === ARMOR_NONE && isArmor(gear)) ||
            (get(shield) === SHIELD_NONE && isShield(gear)) ||
            (get(weapon) === WEAPON_NONE && isWeapon(gear)))
        ) {
          isEquipped = true;
          toggleEquipGear(gear);
        }

        set(inventory, (current) => ({
          ...current,
          [id]: { isEquipped, key, possession: gear },
        }));

        return true;
      },
    [toggleEquipGear]
  );
}

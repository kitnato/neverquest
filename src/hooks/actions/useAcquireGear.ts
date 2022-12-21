import { nanoid } from "nanoid";
import { useRecoilCallback } from "recoil";

import { NO_ARMOR, NO_SHIELD, NO_WEAPON } from "@neverquest/constants/gear";
import useToggleEquipGear from "@neverquest/hooks/actions/useToggleEquipGear";
import { armor, canFit, inventory, shield, weapon } from "@neverquest/state/inventory";
import { autoEquip } from "@neverquest/state/settings";
import { Gear } from "@neverquest/types";
import { isArmor, isShield, isWeapon } from "@neverquest/types/type-guards";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

export default function () {
  const toggleEquipGear = useToggleEquipGear();

  return useRecoilCallback(({ set, snapshot }) => ({ gear }: { gear: Gear }) => {
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
      ((get(armor) === NO_ARMOR && isArmor(gear)) ||
        (get(shield) === NO_SHIELD && isShield(gear)) ||
        (get(weapon) === NO_WEAPON && isWeapon(gear)))
    ) {
      isEquipped = true;
      toggleEquipGear(gear);
    }

    set(inventory, (current) => ({
      ...current,
      [id]: { isEquipped, key, possession: gear },
    }));

    return true;
  });
}

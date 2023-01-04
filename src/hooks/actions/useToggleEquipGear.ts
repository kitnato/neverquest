import { useRecoilCallback } from "recoil";

import { attributes } from "@neverquest/state/attributes";
import { inventory } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { Gear } from "@neverquest/types";
import { AttributeType, ShowingType } from "@neverquest/types/enums";
import { isArmor, isGear, isShield, isWeapon } from "@neverquest/types/type-guards";
import { getSnapshotGetter } from "@neverquest/utilities/getters";

// TODO - refactor with useRecoilTransaction so that these can be called from each other without passing values
export default function () {
  return useRecoilCallback(({ set, snapshot }) => (idOrGear: string | Gear) => {
    const get = getSnapshotGetter(snapshot);

    let possession;

    if (isGear(idOrGear)) {
      possession = idOrGear;
    } else {
      possession = get(inventory)[idOrGear].possession;

      set(inventory, (current) => ({
        ...current,
        [idOrGear]: { ...current[idOrGear], isEquipped: !current[idOrGear].isEquipped },
      }));
    }

    if (isArmor(possession)) {
      if (!get(isShowing(ShowingType.Armor))) {
        set(isShowing(ShowingType.Armor), true);
      }

      if (!get(isShowing(ShowingType.TotalProtection))) {
        set(isShowing(ShowingType.TotalProtection), true);
      }

      if (!get(isShowing(ShowingType.Deflection)) && possession.deflection) {
        set(isShowing(ShowingType.Deflection), true);
      }
    }

    if (isShield(possession)) {
      if (!get(isShowing(ShowingType.Shield))) {
        set(isShowing(ShowingType.Shield), true);
      }

      if (!get(isShowing(ShowingType.BlockChance))) {
        set(isShowing(ShowingType.BlockChance), true);
      }
    }

    if (isWeapon(possession)) {
      if (!get(isShowing(ShowingType.Stamina)) && possession.staminaCost > 0) {
        set(isShowing(ShowingType.Stamina), true);

        if (!get(attributes(AttributeType.Stamina)).isUnlocked) {
          set(attributes(AttributeType.Stamina), (current) => ({
            ...current,
            isUnlocked: true,
          }));
        }
      }

      if (!get(isShowing(ShowingType.TotalAttackRateSummary))) {
        set(isShowing(ShowingType.TotalAttackRateSummary), true);
      }

      if (!get(isShowing(ShowingType.TotalDamageSummary))) {
        set(isShowing(ShowingType.TotalDamageSummary), true);
      }

      if (!get(isShowing(ShowingType.Weapon))) {
        set(isShowing(ShowingType.Weapon), true);
      }
    }
  });
}

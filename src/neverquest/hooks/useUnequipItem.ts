import { useSetAtom } from "jotai";
import { useResetAtom } from "jotai/utils";

import { armor, inventory, shield, trinket, weapon } from "neverquest/state/inventory";
import { InventoryProps } from "neverquest/types/props";
import { isTrinket, isArmor, isShield, isWeapon } from "neverquest/utilities/type-guards";

export default function useUnequipItem() {
  const resetArmor = useResetAtom(armor);
  const resetShield = useResetAtom(shield);
  const resetTrinket = useResetAtom(trinket);
  const resetWeapon = useResetAtom(weapon);
  const setInventory = useSetAtom(inventory);

  return ({ id, item }: InventoryProps) => {
    if (isArmor(item)) {
      resetArmor();
    }

    if (isShield(item)) {
      resetShield();
    }

    if (isTrinket(item)) {
      resetTrinket();
    }

    if (isWeapon(item)) {
      resetWeapon();
    }

    setInventory((current) => ({
      ...current,
      [id]: { ...current[id], isEquipped: false },
    }));
  };
}

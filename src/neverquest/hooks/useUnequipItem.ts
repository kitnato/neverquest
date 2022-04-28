import { useResetRecoilState, useSetRecoilState } from "recoil";

import { InventoryContentProps } from "neverquest/env";
import { accessory, armor, inventory, shield, weapon } from "neverquest/state/inventory";
import { isAccessory, isArmor, isShield, isWeapon } from "neverquest/utilities/type-guards";

export default function useUnequipItem() {
  const resetAccessory = useResetRecoilState(accessory);
  const resetArmor = useResetRecoilState(armor);
  const resetShield = useResetRecoilState(shield);
  const resetWeapon = useResetRecoilState(weapon);
  const setInventory = useSetRecoilState(inventory);

  return ({ item, key }: InventoryContentProps) => {
    if (isAccessory(item)) {
      resetAccessory();
    }

    if (isArmor(item)) {
      resetArmor();
    }

    if (isShield(item)) {
      resetShield();
    }

    if (isWeapon(item)) {
      resetWeapon();
    }

    setInventory((currentInventory) => ({
      ...currentInventory,
      [key]: { ...currentInventory[key], isEquipped: false },
    }));
  };
}

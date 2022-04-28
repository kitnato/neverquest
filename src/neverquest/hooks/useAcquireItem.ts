import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { Equipment } from "neverquest/env";
import useCheckEncumbrance from "neverquest/hooks/useCheckEncumbrance";
import useEquipItem from "neverquest/hooks/useEquipItem";
import { accessory, armor, inventory, shield, weapon } from "neverquest/state/inventory";
import { autoEquip } from "neverquest/state/global";
import { showInventoryButton } from "neverquest/state/show";
import { NO_ACCESSORY, NO_ARMOR, NO_SHIELD, NO_WEAPON } from "neverquest/utilities/constants";
import { isAccessory, isArmor, isShield, isWeapon } from "neverquest/utilities/type-guards";

export default function useAcquireItem() {
  const checkEncumbrance = useCheckEncumbrance();
  const equipItem = useEquipItem();
  const [showInventoryButtonValue, setShowInventoryButton] = useRecoilState(showInventoryButton);
  const armorValue = useRecoilValue(armor);
  const accessoryValue = useRecoilValue(accessory);
  const shieldValue = useRecoilValue(shield);
  const weaponValue = useRecoilValue(weapon);
  const autoEquipValue = useRecoilValue(autoEquip);
  const setInventory = useSetRecoilState(inventory);

  return ({ item }: { item: Equipment }) => {
    if (!checkEncumbrance({ weight: item.weight })) {
      return false;
    }

    const key = uuidv4();

    setInventory((currentInventory) => ({
      ...currentInventory,
      [key]: { item },
    }));

    if (
      autoEquipValue &&
      ((accessoryValue === NO_ACCESSORY && isAccessory(item)) ||
        (armorValue === NO_ARMOR && isArmor(item)) ||
        (shieldValue === NO_SHIELD && isShield(item)) ||
        (weaponValue === NO_WEAPON && isWeapon(item)))
    ) {
      equipItem({ item, key });
    }

    if (!showInventoryButtonValue) {
      setShowInventoryButton(true);
    }

    return true;
  };
}

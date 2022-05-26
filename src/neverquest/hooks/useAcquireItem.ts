import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { nanoid } from "nanoid";

import { Equipment } from "neverquest/types/core";
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
  const [showInventoryButtonValue, setShowInventoryButton] = useAtom(showInventoryButton);
  const armorValue = useAtomValue(armor);
  const accessoryValue = useAtomValue(accessory);
  const shieldValue = useAtomValue(shield);
  const weaponValue = useAtomValue(weapon);
  const autoEquipValue = useAtomValue(autoEquip);
  const setInventory = useSetAtom(inventory);

  return ({ item }: { item: Equipment }) => {
    if (!checkEncumbrance({ weight: item.weight })) {
      return false;
    }

    const id = Symbol();
    const key = nanoid();

    setInventory((current) => ({
      ...current,
      [id]: { item, key },
    }));

    if (
      autoEquipValue &&
      ((accessoryValue === NO_ACCESSORY && isAccessory(item)) ||
        (armorValue === NO_ARMOR && isArmor(item)) ||
        (shieldValue === NO_SHIELD && isShield(item)) ||
        (weaponValue === NO_WEAPON && isWeapon(item)))
    ) {
      equipItem({ id, item });
    }

    if (!showInventoryButtonValue) {
      setShowInventoryButton(true);
    }

    return true;
  };
}

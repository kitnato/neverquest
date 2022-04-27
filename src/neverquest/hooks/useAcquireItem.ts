import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { v4 as uuidv4 } from "uuid";

import { InventoryItemStatus, EquipmentObject, EquipmentType } from "neverquest/env";
import useEquipItem from "neverquest/hooks/useEquipItem";
import {
  accessory,
  armor,
  isInventoryFull,
  shield,
  storedInventory,
  weapon,
} from "neverquest/state/inventory";
import { autoEquip } from "neverquest/state/global";
import { showInventoryButton } from "neverquest/state/show";
import { NO_ACCESSORY, NO_ARMOR, NO_SHIELD, NO_WEAPON } from "neverquest/utilities/constants";

export default function useAcquireItem() {
  const equipItem = useEquipItem();
  const [showInventoryButtonValue, setShowInventoryButton] = useRecoilState(showInventoryButton);
  const armorValue = useRecoilValue(armor);
  const accessoryValue = useRecoilValue(accessory);
  const isInventoryFullValue = useRecoilValue(isInventoryFull);
  const shieldValue = useRecoilValue(shield);
  const weaponValue = useRecoilValue(weapon);
  const autoEquipValue = useRecoilValue(autoEquip);
  const setStoredInventory = useSetRecoilState(storedInventory);

  return ({
    isUnequipping = false,
    item,
    type,
  }: {
    isUnequipping?: boolean;
    item: EquipmentObject;
    type: EquipmentType;
  }) => {
    if (isInventoryFullValue) {
      return InventoryItemStatus.Rejected;
    }

    if (!showInventoryButtonValue) {
      setShowInventoryButton(true);
    }

    if (
      !isUnequipping &&
      autoEquipValue &&
      ((accessoryValue.name === NO_ACCESSORY.name && type === EquipmentType.Accessory) ||
        (armorValue.name === NO_ARMOR.name && type === EquipmentType.Armor) ||
        (shieldValue.name === NO_SHIELD.name && type === EquipmentType.Shield) ||
        (weaponValue.name === NO_WEAPON.name && type === EquipmentType.Weapon))
    ) {
      return equipItem({ item, type });
    }

    setStoredInventory((currentInventory) => ({
      ...currentInventory,
      [uuidv4()]: { item, type },
    }));

    return InventoryItemStatus.Stored;
  };
}

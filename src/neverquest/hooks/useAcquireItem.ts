import { useRecoilState, useRecoilValue } from "recoil";
import { v4 as uuidv4 } from "uuid";

import {
  Armor,
  InventoryItemStatus,
  Accessory,
  Shield,
  EquipmentType,
  Weapon,
} from "neverquest/env.d";
import useEquipItem from "neverquest/hooks/useEquipItem";
import { accessory, armor, inventory, shield, weapon } from "neverquest/state/equipment";
import { autoEquip } from "neverquest/state/global";
import { NO_ACCESSORY, NO_ARMOR, NO_SHIELD, NO_WEAPON } from "neverquest/utilities/constants";

export default function useAcquireItem() {
  const equipItem = useEquipItem();
  const [inventoryValue, setInventory] = useRecoilState(inventory);
  const armorValue = useRecoilValue(armor);
  const accessoryValue = useRecoilValue(accessory);
  const shieldValue = useRecoilValue(shield);
  const weaponValue = useRecoilValue(weapon);
  const autoEquipValue = useRecoilValue(autoEquip);

  return ({ item, type }: { item: Armor | Accessory | Shield | Weapon; type: EquipmentType }) => {
    if (
      autoEquipValue &&
      ((accessoryValue.name === NO_ACCESSORY.name && type === EquipmentType.Accessory) ||
        (armorValue.name === NO_ARMOR.name && type === EquipmentType.Armor) ||
        (shieldValue.name === NO_SHIELD.name && type === EquipmentType.Shield) ||
        (weaponValue.name === NO_WEAPON.name && type === EquipmentType.Weapon))
    ) {
      return equipItem({ item, type });
    } else {
      if (Object.keys(inventoryValue).length < inventoryValue.size) {
        setInventory({
          ...inventoryValue,
          contents: {
            ...inventoryValue.contents,
            [uuidv4()]: { item, type },
          },
        });
        return InventoryItemStatus.Stored;
      }

      return InventoryItemStatus.Rejected;
    }
  };
}

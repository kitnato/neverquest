import { useRecoilState, useRecoilValue } from "recoil";

import {
  Armor,
  InventoryItemStatus,
  Accessory,
  Shield,
  EquipmentType,
  Weapon,
} from "neverquest/env.d";
import { armor, inventory, accessory, shield, weapon } from "neverquest/state/equipment";
import { autoEquip, show } from "neverquest/state/global";
import { NO_ARMOR, NO_ACCESSORY, NO_SHIELD, NO_WEAPON } from "neverquest/utilities/constants";

export default function useReceiveItem() {
  const [armorValue, setArmor] = useRecoilState(armor);
  const [inventoryValue, setInventory] = useRecoilState(inventory);
  const [accessoryValue, setAccessory] = useRecoilState(accessory);
  const [shieldValue, setShield] = useRecoilState(shield);
  const [showValue, setShow] = useRecoilState(show);
  const [weaponValue, setWeapon] = useRecoilState(weapon);
  const autoEquipValue = useRecoilValue(autoEquip);

  return ({ item, type }: { item: Armor | Accessory | Shield | Weapon; type: EquipmentType }) => {
    if (autoEquipValue) {
      switch (type) {
        case EquipmentType.Armor:
          if (armorValue.name === NO_ARMOR.name) {
            setArmor(item as Armor);
          }
          return InventoryItemStatus.Equipped;
        case EquipmentType.Accessory:
          if (accessoryValue.name === NO_ACCESSORY.name) {
            setAccessory(item as Accessory);

            if (!showValue.accessory) {
              setShow({ ...showValue, accessory: true });
            }
          }
          return InventoryItemStatus.Equipped;
        case EquipmentType.Shield:
          if (shieldValue.name === NO_SHIELD.name) {
            setShield(item as Shield);

            if (!showValue.shield) {
              setShow({ ...showValue, shield: true });
            }
          }
          return InventoryItemStatus.Equipped;
        case EquipmentType.Weapon:
          if (weaponValue.name === NO_WEAPON.name) {
            setWeapon(item as Weapon);

            if (!showValue.weapon) {
              setShow({ ...showValue, weapon: true });
            }
          }
          return InventoryItemStatus.Equipped;
        default:
          break;
      }
    }

    if (Object.keys(inventoryValue).length < inventoryValue.size) {
      setInventory({
        ...inventoryValue,
        contents: { item, ...inventoryValue.contents },
      });
      return InventoryItemStatus.Stored;
    }

    return InventoryItemStatus.Rejected;
  };
}

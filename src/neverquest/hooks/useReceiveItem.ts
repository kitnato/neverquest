import { useRecoilState, useRecoilValue } from "recoil";

import { Armor, InventoryItemStatus, Jewelry, Shield, ItemType, Weapon } from "neverquest/env.d";
import { armor, inventory, jewelry, shield, weapon } from "neverquest/state/equipment";
import { autoEquip } from "neverquest/state/global";
import { NO_ARMOR, NO_JEWELRY, NO_SHIELD, NO_WEAPON } from "neverquest/utilities/constants";

export default function useReceiveItem() {
  const [armorValue, setArmor] = useRecoilState(armor);
  const [inventoryValue, setInventory] = useRecoilState(inventory);
  const [jewelryValue, setJewelry] = useRecoilState(jewelry);
  const [shieldValue, setShield] = useRecoilState(shield);
  const [weaponValue, setWeapon] = useRecoilState(weapon);
  const autoEquipValue = useRecoilValue(autoEquip);

  return ({ item, type }: { item: Armor | Jewelry | Shield | Weapon; type: ItemType }) => {
    if (autoEquipValue) {
      switch (type) {
        case ItemType.Armor:
          if (armorValue.name === NO_ARMOR.name) {
            setArmor(item as Armor);
          }
          return InventoryItemStatus.Equipped;
        case ItemType.Jewelry:
          if (jewelryValue.name === NO_JEWELRY.name) {
            setJewelry(item as Jewelry);
          }
          return InventoryItemStatus.Equipped;
        case ItemType.Shield:
          if (shieldValue.name === NO_SHIELD.name) {
            setShield(item as Shield);
          }
          return InventoryItemStatus.Equipped;
        case ItemType.Weapon:
          if (weaponValue.name === NO_WEAPON.name) {
            setWeapon(item as Weapon);
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

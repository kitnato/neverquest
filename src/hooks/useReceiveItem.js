import { useRecoilState, useRecoilValue } from "recoil";

import { armor, inventory, jewelry, shield, weapon } from "state/equipment";
import { autoEquip } from "state/global";
import {
  INVENTORY_EQUIPPED,
  INVENTORY_REJECTED,
  INVENTORY_STORED,
  ITEM_TYPE_ARMOR,
  ITEM_TYPE_JEWELRY,
  ITEM_TYPE_SHIELD,
  ITEM_TYPE_WEAPON,
  NO_ARMOR,
  NO_JEWELRY,
  NO_SHIELD,
  NO_WEAPON,
} from "utilities/constants";

export default function useReceiveItem() {
  const [armorValue, setArmor] = useRecoilState(armor);
  const [inventoryValue, setInventory] = useRecoilState(inventory);
  const [jewelryValue, setJewelry] = useRecoilState(jewelry);
  const [shieldValue, setShield] = useRecoilState(shield);
  const [weaponValue, setWeapon] = useRecoilState(weapon);
  const autoEquipValue = useRecoilValue(autoEquip);

  return ({ item, type }) => {
    if (autoEquipValue) {
      switch (type) {
        case ITEM_TYPE_ARMOR:
          if (armorValue.name === NO_ARMOR.name) {
            setArmor(item);
          }
          return INVENTORY_EQUIPPED;
        case ITEM_TYPE_JEWELRY:
          if (jewelryValue.name === NO_JEWELRY.name) {
            setJewelry(item);
          }
          return INVENTORY_EQUIPPED;
        case ITEM_TYPE_SHIELD:
          if (shieldValue.name === NO_SHIELD.name) {
            setShield(item);
          }
          return INVENTORY_EQUIPPED;
        case ITEM_TYPE_WEAPON:
          if (weaponValue.name === NO_WEAPON.name) {
            setWeapon(item);
          }
          return INVENTORY_EQUIPPED;
        default:
          break;
      }
    }

    if (Object.keys(inventoryValue).length < inventoryValue.size) {
      setInventory({
        contents: { item, ...inventoryValue.contents },
        ...inventoryValue,
      });
      return INVENTORY_STORED;
    }

    return INVENTORY_REJECTED;
  };
}

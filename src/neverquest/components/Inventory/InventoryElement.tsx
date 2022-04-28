import ArmorInventory from "neverquest/components/Inventory/Armor/ArmorInventory";
import ShieldInventory from "neverquest/components/Inventory/Shield/ShieldInventory";
import WeaponInventory from "neverquest/components/Inventory/Weapon/WeaponInventory";
import { Equipment } from "neverquest/env";
import { isArmor, isShield, isWeapon } from "neverquest/utilities/type-guards";

export default function InventoryElement({ item }: { item: Equipment }) {
  // TODO - all types
  if (isArmor(item)) {
    return <ArmorInventory armor={item} />;
  }

  if (isShield(item)) {
    return <ShieldInventory shield={item} />;
  }

  if (isWeapon(item)) {
    return <WeaponInventory weapon={item} />;
  }

  return null;
}

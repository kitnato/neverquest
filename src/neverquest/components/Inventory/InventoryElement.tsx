import ArmorInventory from "neverquest/components/Inventory/Armor/ArmorInventory";
import ShieldInventory from "neverquest/components/Inventory/Shield/ShieldInventory";
import WeaponInventory from "neverquest/components/Inventory/Weapon/WeaponInventory";
import { Armor, EquipmentObject, EquipmentType, Shield, Weapon } from "neverquest/env";

export default function InventoryElement({
  item,
  type,
}: {
  item: EquipmentObject;
  type: EquipmentType;
}) {
  // TODO - all types
  switch (type) {
    case EquipmentType.Armor:
      return <ArmorInventory armor={item as Armor} />;
    case EquipmentType.Shield:
      return <ShieldInventory shield={item as Shield} />;
    case EquipmentType.Weapon:
      return <WeaponInventory weapon={item as Weapon} />;
  }

  return null;
}

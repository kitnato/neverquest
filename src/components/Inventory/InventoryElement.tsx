import { ArmorDisplay } from "@neverquest/components/Inventory/Armor/ArmorDisplay";
import { ShieldDisplay } from "@neverquest/components/Inventory/Shield/ShieldDisplay";
import { TrinketItem } from "@neverquest/components/Inventory/TrinketItem";
import { WeaponDisplay } from "@neverquest/components/Inventory/Weapon/WeaponDisplay";
import { Item } from "@neverquest/types";
import { isArmor, isShield, isWeapon } from "@neverquest/types/type-guards";

export function InventoryElement({ item }: { item: Item }) {
  if (isArmor(item)) {
    return <ArmorDisplay armor={item} />;
  }

  if (isShield(item)) {
    return <ShieldDisplay shield={item} />;
  }

  if (isWeapon(item)) {
    return <WeaponDisplay weapon={item} />;
  }

  return <TrinketItem trinket={item} />;
}

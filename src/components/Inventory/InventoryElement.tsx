import { ArmorDisplay } from "@neverquest/components/Inventory/Armor/ArmorDisplay";
import { ShieldDisplay } from "@neverquest/components/Inventory/Shield/ShieldDisplay";
import { TrinketDisplay } from "@neverquest/components/Inventory/Trinket/TrinketDisplay";
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

  return <TrinketDisplay trinket={item} />;
}

import ArmorDisplay from "@neverquest/components/Inventory/Armor/ArmorDisplay";
import Item from "@neverquest/components/Inventory/Item";
import ShieldDisplay from "@neverquest/components/Inventory/Shield/ShieldDisplay";
import WeaponDisplay from "@neverquest/components/Inventory/Weapon/WeaponDisplay";
import { Possession } from "@neverquest/types";
import { isArmor, isShield, isWeapon } from "@neverquest/types/type-guards";

export default function ({ possession }: { possession: Possession }) {
  if (isArmor(possession)) {
    return <ArmorDisplay armor={possession} />;
  }

  if (isShield(possession)) {
    return <ShieldDisplay shield={possession} />;
  }

  if (isWeapon(possession)) {
    return <WeaponDisplay weapon={possession} />;
  }

  return <Item item={possession} />;
}

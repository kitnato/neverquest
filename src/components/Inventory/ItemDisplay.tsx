import type { Placement } from "react-bootstrap/esm/types";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ArmorName } from "@neverquest/components/Inventory/Armor/ArmorName";
import { ItemName } from "@neverquest/components/Inventory/ItemName";
import { ShieldName } from "@neverquest/components/Inventory/Shield/ShieldName";
import { WeaponName } from "@neverquest/components/Inventory/Weapon/WeaponName";
import { CONSUMABLES, TRINKETS } from "@neverquest/data/inventory";
import { ReactComponent as IconArmor } from "@neverquest/icons/armor.svg";
import { ReactComponent as IconShield } from "@neverquest/icons/shield.svg";
import { ReactComponent as IconWeapon } from "@neverquest/icons/weapon.svg";
import type { Item } from "@neverquest/types";
import type { IconImageDOMProps } from "@neverquest/types/props";
import { isArmor, isShield, isTrinket, isWeapon } from "@neverquest/types/type-guards";

export function ItemDisplay({
  iconProps,
  item,
  overlayPlacement,
}: {
  iconProps?: IconImageDOMProps;
  item: Item;
  overlayPlacement?: Placement;
}) {
  if (isArmor(item)) {
    return (
      <IconDisplay
        contents={<ArmorName armor={item} placement={overlayPlacement} />}
        Icon={IconArmor}
        iconProps={iconProps}
        tooltip="Armor"
      />
    );
  }

  if (isShield(item)) {
    return (
      <IconDisplay
        contents={<ShieldName placement={overlayPlacement} shield={item} />}
        Icon={IconShield}
        iconProps={iconProps}
        tooltip="Shield"
      />
    );
  }

  if (isTrinket(item)) {
    return (
      <IconDisplay
        contents={<ItemName item={item} placement={overlayPlacement} />}
        Icon={TRINKETS[item.type].Icon}
        iconProps={iconProps}
        tooltip="Trinket"
      />
    );
  }

  if (isWeapon(item)) {
    return (
      <IconDisplay
        contents={<WeaponName placement={overlayPlacement} weapon={item} />}
        Icon={IconWeapon}
        iconProps={iconProps}
        tooltip="Weapon"
      />
    );
  }

  return (
    <IconDisplay
      contents={<ItemName item={item} placement={overlayPlacement} />}
      Icon={CONSUMABLES[item.type].Icon}
      iconProps={iconProps}
      tooltip="Consumable"
    />
  );
}

import type { ReactNode } from "react";
import type { Placement } from "react-bootstrap/esm/types";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ArmorName } from "@neverquest/components/Inventory/Armor/ArmorName";
import { ItemName } from "@neverquest/components/Inventory/ItemName";
import { ShieldName } from "@neverquest/components/Inventory/Offhand/ShieldName";
import { WeaponName } from "@neverquest/components/Inventory/Weapon/WeaponName";
import { CONSUMABLES, INFUSABLES, TRINKETS } from "@neverquest/data/inventory";
import IconArmor from "@neverquest/icons/armor.svg?react";
import IconGem from "@neverquest/icons/gem.svg?react";
import IconMelee from "@neverquest/icons/melee.svg?react";
import IconRanged from "@neverquest/icons/ranged.svg?react";
import IconShield from "@neverquest/icons/shield.svg?react";
import type { InventoryItem } from "@neverquest/types";
import type { IconImageDOMProperties } from "@neverquest/types/components";
import {
  isArmor,
  isConsumableItem,
  isInfusableItem,
  isMelee,
  isShield,
  isTrinketItem,
  isWeapon,
} from "@neverquest/types/type-guards";

export function ItemDisplay({
  description,
  iconProps,
  item,
  overlayPlacement,
  stack,
}: {
  description?: ReactNode;
  extra?: string;
  iconProps?: IconImageDOMProperties;
  item: InventoryItem;
  overlayPlacement?: Placement;
  stack?: number;
}) {
  if (isArmor(item)) {
    return (
      <IconDisplay description={description} Icon={IconArmor} iconProps={iconProps} tooltip="Armor">
        <ArmorName armor={item} placement={overlayPlacement} />
      </IconDisplay>
    );
  }

  if (isConsumableItem(item)) {
    return (
      <IconDisplay
        description={description}
        Icon={CONSUMABLES[item.name].Icon}
        iconProps={iconProps}
        tooltip="Consumable"
      >
        <ItemName item={item} placement={overlayPlacement} stack={stack} />
      </IconDisplay>
    );
  }

  if (isInfusableItem(item)) {
    return (
      <IconDisplay
        description={description}
        Icon={INFUSABLES[item.name].Icon}
        iconProps={iconProps}
        tooltip="Infusable trinket"
      >
        <ItemName item={item} placement={overlayPlacement} />
      </IconDisplay>
    );
  }

  if (isShield(item)) {
    return (
      <IconDisplay
        description={description}
        Icon={IconShield}
        iconProps={iconProps}
        tooltip="Shield"
      >
        <ShieldName placement={overlayPlacement} shield={item} />
      </IconDisplay>
    );
  }

  if (isTrinketItem(item)) {
    return (
      <IconDisplay
        description={description}
        Icon={TRINKETS[item.name].Icon}
        iconProps={iconProps}
        tooltip="Trinket"
      >
        <ItemName item={item} placement={overlayPlacement} />
      </IconDisplay>
    );
  }

  if (isWeapon(item)) {
    return (
      <IconDisplay
        description={description}
        Icon={isMelee(item) ? IconMelee : IconRanged}
        iconProps={iconProps}
        tooltip="Weapon"
      >
        <WeaponName placement={overlayPlacement} weapon={item} />
      </IconDisplay>
    );
  }

  return (
    <IconDisplay description={description} Icon={IconGem} iconProps={iconProps} tooltip="Gem">
      <ItemName item={item} placement={overlayPlacement} stack={stack} />
    </IconDisplay>
  );
}

import type { ReactNode } from "react";
import type { Placement } from "react-bootstrap/esm/types";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ArmorName } from "@neverquest/components/Inventory/Armor/ArmorName";
import { ItemName } from "@neverquest/components/Inventory/ItemName";
import { ShieldName } from "@neverquest/components/Inventory/Offhand/ShieldName";
import { WeaponName } from "@neverquest/components/Inventory/Weapon/WeaponName";
import { CONSUMABLES, INFUSABLES, TRINKETS } from "@neverquest/data/inventory";
import { ReactComponent as IconArmor } from "@neverquest/icons/armor.svg";
import { ReactComponent as IconGem } from "@neverquest/icons/gem.svg";
import { ReactComponent as IconMelee } from "@neverquest/icons/melee.svg";
import { ReactComponent as IconRanged } from "@neverquest/icons/ranged.svg";
import { ReactComponent as IconShield } from "@neverquest/icons/shield.svg";
import type { InventoryItem } from "@neverquest/types";
import type { IconImageDOMProps } from "@neverquest/types/props";
import {
  isArmor,
  isConsumable,
  isInfusable,
  isMelee,
  isShield,
  isTrinket,
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
  iconProps?: IconImageDOMProps;
  item: InventoryItem;
  overlayPlacement?: Placement;
  stack?: number;
}) {
  if (isArmor(item)) {
    return (
      <IconDisplay
        contents={<ArmorName armor={item} placement={overlayPlacement} />}
        description={description}
        Icon={IconArmor}
        iconProps={iconProps}
        tooltip="Armor"
      />
    );
  }

  if (isConsumable(item)) {
    return (
      <IconDisplay
        contents={<ItemName item={item} placement={overlayPlacement} stack={stack} />}
        description={description}
        Icon={CONSUMABLES[item.name].Icon}
        iconProps={iconProps}
        tooltip="Consumable"
      />
    );
  }

  if (isInfusable(item)) {
    return (
      <IconDisplay
        contents={<ItemName item={item} placement={overlayPlacement} />}
        description={description}
        Icon={INFUSABLES[item.name].Icon}
        iconProps={iconProps}
        tooltip="Infusable trinket"
      />
    );
  }

  if (isShield(item)) {
    return (
      <IconDisplay
        contents={<ShieldName placement={overlayPlacement} shield={item} />}
        description={description}
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
        description={description}
        Icon={TRINKETS[item.name].Icon}
        iconProps={iconProps}
        tooltip="Trinket"
      />
    );
  }

  if (isWeapon(item)) {
    return (
      <IconDisplay
        contents={<WeaponName placement={overlayPlacement} weapon={item} />}
        description={description}
        Icon={isMelee(item) ? IconMelee : IconRanged}
        iconProps={iconProps}
        tooltip="Weapon"
      />
    );
  }

  return (
    <IconDisplay
      contents={<ItemName item={item} placement={overlayPlacement} stack={stack} />}
      description={description}
      Icon={IconGem}
      iconProps={iconProps}
      tooltip="Gem"
    />
  );
}

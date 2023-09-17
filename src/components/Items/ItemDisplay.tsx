import type { Placement } from "react-bootstrap/esm/types";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ArmorName } from "@neverquest/components/Items/Armor/ArmorName";
import { ItemName } from "@neverquest/components/Items/ItemName";
import { ShieldName } from "@neverquest/components/Items/Offhand/ShieldName";
import { WeaponName } from "@neverquest/components/Items/Weapon/WeaponName";
import { CONSUMABLES, TRINKETS } from "@neverquest/data/inventory";
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
  isMelee,
  isShield,
  isTrinket,
  isWeapon,
} from "@neverquest/types/type-guards";

export function ItemDisplay({
  hideDescription = false,
  iconProps,
  item,
  overlayPlacement,
  stack,
}: {
  hideDescription?: boolean;
  iconProps?: IconImageDOMProps;
  item: InventoryItem;
  overlayPlacement?: Placement;
  stack?: number;
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

  if (isConsumable(item)) {
    const { type } = item;

    return (
      <IconDisplay
        contents={<ItemName item={item} placement={overlayPlacement} stack={stack} />}
        Icon={CONSUMABLES[type].Icon}
        iconProps={iconProps}
        tooltip="Consumable"
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
        contents={<ItemName item={item} placement={overlayPlacement} stack={stack} />}
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
        Icon={isMelee(item) ? IconMelee : IconRanged}
        iconProps={iconProps}
        tooltip="Weapon"
      />
    );
  }

  return (
    <IconDisplay
      contents={
        <ItemName
          hideOverlay={hideDescription}
          item={item}
          placement={overlayPlacement}
          stack={stack}
        />
      }
      Icon={IconGem}
      iconProps={iconProps}
      tooltip="Gem"
    />
  );
}

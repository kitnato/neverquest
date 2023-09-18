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
  extra = "",
  hideDescription = false,
  iconProps,
  item,
  overlayPlacement,
  stack,
}: {
  extra?: string;
  hideDescription?: boolean;
  iconProps?: IconImageDOMProps;
  item: InventoryItem;
  overlayPlacement?: Placement;
  stack?: number;
}) {
  if (isArmor(item)) {
    return (
      <IconDisplay
        contents={
          <span>
            <ArmorName armor={item} placement={overlayPlacement} />
            {extra}
          </span>
        }
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
        contents={
          <span>
            <ItemName item={item} placement={overlayPlacement} stack={stack} />
            {extra}
          </span>
        }
        Icon={CONSUMABLES[type].Icon}
        iconProps={iconProps}
        tooltip="Consumable"
      />
    );
  }

  if (isShield(item)) {
    return (
      <IconDisplay
        contents={
          <span>
            <ShieldName placement={overlayPlacement} shield={item} />
            {extra}
          </span>
        }
        Icon={IconShield}
        iconProps={iconProps}
        tooltip="Shield"
      />
    );
  }

  if (isTrinket(item)) {
    return (
      <IconDisplay
        contents={
          <span>
            <ItemName item={item} placement={overlayPlacement} />
            {extra}
          </span>
        }
        Icon={TRINKETS[item.type].Icon}
        iconProps={iconProps}
        tooltip="Trinket"
      />
    );
  }

  if (isWeapon(item)) {
    return (
      <IconDisplay
        contents={
          <span>
            <WeaponName placement={overlayPlacement} weapon={item} />
            {extra}
          </span>
        }
        Icon={isMelee(item) ? IconMelee : IconRanged}
        iconProps={iconProps}
        tooltip="Weapon"
      />
    );
  }

  return (
    <IconDisplay
      contents={
        <span>
          <ItemName
            hideOverlay={hideDescription}
            item={item}
            placement={overlayPlacement}
            stack={stack}
          />
          {extra}
        </span>
      }
      Icon={IconGem}
      iconProps={iconProps}
      tooltip="Gem"
    />
  );
}

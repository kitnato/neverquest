import type { Placement } from "react-bootstrap/esm/types";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ArmorName } from "@neverquest/components/Inventory/Armor/ArmorName";
import { ShieldName } from "@neverquest/components/Inventory/Shield/ShieldName";
import { TrinketName } from "@neverquest/components/Inventory/Trinket/TrinketName";
import { WeaponName } from "@neverquest/components/Inventory/Weapon/WeaponName";
import { ICON_UNKNOWN } from "@neverquest/constants";
import { ARMOR_ICON, SHIELD_ICON, WEAPON_ICON } from "@neverquest/data/gear";
import * as Trinkets from "@neverquest/data/trinkets";
import type { Item } from "@neverquest/types";
import type { IconImageDOMProps } from "@neverquest/types/props";
import { isArmor, isShield, isWeapon } from "@neverquest/types/type-guards";

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
        Icon={ARMOR_ICON}
        iconProps={iconProps}
        tooltip="Armor"
      />
    );
  }

  if (isShield(item)) {
    return (
      <IconDisplay
        contents={<ShieldName placement={overlayPlacement} shield={item} />}
        Icon={SHIELD_ICON}
        iconProps={iconProps}
        tooltip="Shield"
      />
    );
  }

  if (isWeapon(item)) {
    return (
      <IconDisplay
        contents={<WeaponName placement={overlayPlacement} weapon={item} />}
        Icon={WEAPON_ICON}
        iconProps={iconProps}
        tooltip="Weapon"
      />
    );
  }

  // TODO - If part of an inventory, the Icon FC does not get stored, so it needs to be looked up.
  const { name } = item;
  let { Icon } = item;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (!Icon) {
    Icon =
      Object.values(Trinkets).find(({ name: trinketName }) => trinketName === name)?.Icon ??
      ICON_UNKNOWN;
  }

  return (
    <IconDisplay
      contents={<TrinketName placement={overlayPlacement} trinket={item} />}
      Icon={Icon}
      iconProps={iconProps}
      tooltip="Trinket"
    />
  );
}

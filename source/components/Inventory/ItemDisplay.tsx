import type { Placement } from "react-bootstrap/esm/types";

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ArmorName } from "@neverquest/components/Inventory/Armor/ArmorName";
import { InfusionLevelDisplay } from "@neverquest/components/Inventory/Inheritable/Infusion/InfusionLevelDisplay";
import { ItemName } from "@neverquest/components/Inventory/ItemName";
import { AmmunitionPouchStatus } from "@neverquest/components/Inventory/Offhand/AmmunitionPouchStatus";
import { ShieldName } from "@neverquest/components/Inventory/Offhand/ShieldName";
import { WeaponName } from "@neverquest/components/Inventory/Weapon/WeaponName";
import { CONSUMABLES, GEMS, INFUSABLES, TRINKETS } from "@neverquest/data/items";
import IconArmor from "@neverquest/icons/armor.svg?react";
import IconOneHanded from "@neverquest/icons/one-handed.svg?react";
import IconRanged from "@neverquest/icons/ranged.svg?react";
import IconShield from "@neverquest/icons/shield.svg?react";
import IconTwoHanded from "@neverquest/icons/two-handed.svg?react";
import type { InventoryItem } from "@neverquest/types";
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
  amount,
  isEquipped,
  item,
  overlayPlacement = "right",
}: {
  amount?: number;
  isEquipped?: boolean;
  item: InventoryItem;
  overlayPlacement?: Placement;
}) {
  if (isArmor(item)) {
    return (
      <IconDisplay
        description={isEquipped ? "Equipped" : undefined}
        Icon={IconArmor}
        tooltip="Armor"
      >
        <ArmorName armor={item} overlayPlacement={overlayPlacement} />
      </IconDisplay>
    );
  }

  if (isConsumableItem(item)) {
    return (
      <IconDisplay Icon={CONSUMABLES[item.name].Icon} tooltip="Consumable">
        <ItemName amount={amount} item={item} />
      </IconDisplay>
    );
  }

  if (isInfusableItem(item)) {
    const { name } = item;

    return (
      <IconDisplay
        description={<InfusionLevelDisplay infusable={name} overlayPlacement="bottom" />}
        Icon={INFUSABLES[name].Icon}
        tooltip="Infusable trinket"
      >
        <ItemName item={item} />
      </IconDisplay>
    );
  }

  if (isShield(item)) {
    return (
      <IconDisplay
        description={isEquipped ? "Equipped" : undefined}
        Icon={IconShield}
        tooltip="Shield"
      >
        <ShieldName overlayPlacement={overlayPlacement} shield={item} />
      </IconDisplay>
    );
  }

  if (isTrinketItem(item)) {
    const { name } = item;

    return (
      <IconDisplay
        description={name === "ammunition pouch" ? <AmmunitionPouchStatus /> : undefined}
        Icon={TRINKETS[name].Icon}
        tooltip="Trinket"
      >
        <ItemName item={item} />
      </IconDisplay>
    );
  }

  if (isWeapon(item)) {
    const isItemMelee = isMelee(item);

    return (
      <IconDisplay
        description={isEquipped ? "Equipped" : undefined}
        Icon={
          isItemMelee && item.grip === "one-handed"
            ? IconOneHanded
            : isItemMelee && item.grip === "two-handed"
              ? IconTwoHanded
              : IconRanged
        }
        tooltip="Weapon"
      >
        <WeaponName overlayPlacement={overlayPlacement} weapon={item} />
      </IconDisplay>
    );
  }

  return (
    <IconDisplay Icon={GEMS[item.name].Icon} tooltip="Gem">
      <ItemName amount={amount} item={item} />
    </IconDisplay>
  );
}

import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ArmorName } from "@neverquest/components/Inventory/Armor/ArmorName";
import { InfusionLevelDisplay } from "@neverquest/components/Inventory/Inheritable/Infusion/InfusionLevelDisplay";
import { ItemName } from "@neverquest/components/Inventory/ItemName";
import { ShieldName } from "@neverquest/components/Inventory/Offhand/ShieldName";
import { WeaponName } from "@neverquest/components/Inventory/Weapon/WeaponName";
import { CONSUMABLES, INFUSABLES, TRINKETS } from "@neverquest/data/items";
import IconAmmunitionPouch from "@neverquest/icons/ammunition-pouch.svg?react";
import IconAmmunition from "@neverquest/icons/ammunition.svg?react";
import IconArmor from "@neverquest/icons/armor.svg?react";
import IconGem from "@neverquest/icons/gem.svg?react";
import IconMelee from "@neverquest/icons/melee.svg?react";
import IconRanged from "@neverquest/icons/ranged.svg?react";
import IconShield from "@neverquest/icons/shield.svg?react";
import type { InventoryItem } from "@neverquest/types";
import {
  isAmmunitionPouch,
  isArmor,
  isConsumableItem,
  isInfusableItem,
  isMelee,
  isShield,
  isTrinketItem,
  isWeapon,
} from "@neverquest/types/type-guards";
import { formatNumber } from "@neverquest/utilities/formatters";

export function ItemDisplay({
  amount,
  isEquipped,
  isInInventory,
  item,
}: {
  amount?: number;
  isEquipped?: boolean;
  isInInventory?: boolean;
  item: InventoryItem;
}) {
  if (isAmmunitionPouch(item)) {
    const { current, maximum } = item;

    return (
      <IconDisplay
        description={
          <IconDisplay
            Icon={IconAmmunition}
            iconProps={{ className: "small", overlayPlacement: "bottom" }}
            tooltip="Ammunition pouch"
          >{`${formatNumber({ value: current })}/${formatNumber({ value: maximum })}`}</IconDisplay>
        }
        Icon={IconAmmunitionPouch}
      >
        <ItemName item={item} />
      </IconDisplay>
    );
  }

  if (isArmor(item)) {
    return (
      <IconDisplay
        description={isEquipped ? "Equipped" : undefined}
        Icon={IconArmor}
        tooltip="Armor"
      >
        <ArmorName armor={item} isInInventory={isInInventory} />
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
    const { level, name } = item;

    return (
      <IconDisplay
        description={<InfusionLevelDisplay level={level} />}
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
        <ShieldName isInInventory={isInInventory} shield={item} />
      </IconDisplay>
    );
  }

  if (isTrinketItem(item)) {
    return (
      <IconDisplay Icon={TRINKETS[item.name].Icon} tooltip="Trinket">
        <ItemName item={item} />
      </IconDisplay>
    );
  }

  if (isWeapon(item)) {
    return (
      <IconDisplay
        description={isEquipped ? "Equipped" : undefined}
        Icon={isMelee(item) ? IconMelee : IconRanged}
        tooltip="Weapon"
      >
        <WeaponName isInInventory={isInInventory} weapon={item} />
      </IconDisplay>
    );
  }

  return (
    <IconDisplay Icon={IconGem} tooltip="Gem">
      <ItemName amount={amount} item={item} />
    </IconDisplay>
  );
}

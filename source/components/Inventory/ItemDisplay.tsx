import type { Placement } from "react-bootstrap/esm/types"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { ArmorName } from "@neverquest/components/Inventory/Armor/ArmorName"
import { InfusionLevelDisplay } from "@neverquest/components/Inventory/Inheritable/Infusion/InfusionLevelDisplay"
import { LacrimatoryStatus } from "@neverquest/components/Inventory/Inheritable/LacrimatoryStatus"
import { ItemName } from "@neverquest/components/Inventory/ItemName"
import { AmmunitionPouchStatus } from "@neverquest/components/Inventory/Offhand/AmmunitionPouchStatus"
import { ShieldName } from "@neverquest/components/Inventory/Offhand/ShieldName"
import { WeaponName } from "@neverquest/components/Inventory/Weapon/WeaponName"
import { CONSUMABLES, GEMS, INFUSABLES, RELICS } from "@neverquest/data/items"
import IconArmor from "@neverquest/icons/armor.svg?react"
import IconShield from "@neverquest/icons/shield.svg?react"
import { isRelicEquipped } from "@neverquest/state/items"
import type { InventoryItem } from "@neverquest/types"
import {
  isArmor,
  isConsumableItem,
  isInfusableItem,
  isRelicItem,
  isShield,
  isWeapon,
} from "@neverquest/types/type-guards"
import type { Relic } from "@neverquest/types/unions"
import { getGearIcon } from "@neverquest/utilities/getters"

export function ItemDisplay({
  amount,
  isEquipped,
  item,
  overlayPlacement = `right`,
}: {
  amount?: number;
  isEquipped?: boolean;
  item: InventoryItem;
  overlayPlacement?: Placement;
}) {
  const equippedRelics: Partial<Record<Relic, boolean>> = {
    automincer: useRecoilValue(isRelicEquipped(`automincer`)),
    "dream catcher": useRecoilValue(isRelicEquipped(`dream catcher`)),
  }

  if (isArmor(item)) {
    return (
      <IconDisplay
        description={isEquipped ? <span>Equipped</span> : undefined}
        Icon={IconArmor}
        tooltip="Armor"
      >
        <ArmorName armor={item} overlayPlacement={overlayPlacement} />
      </IconDisplay>
    )
  }

  if (isConsumableItem(item)) {
    return (
      <IconDisplay Icon={CONSUMABLES[item.name].Icon} tooltip="Consumable">
        <ItemName amount={amount} item={item} />
      </IconDisplay>
    )
  }

  if (isInfusableItem(item)) {
    const { name } = item

    return (
      <IconDisplay
        description={<InfusionLevelDisplay infusable={name} overlayPlacement="bottom" />}
        Icon={INFUSABLES[name].Icon}
        tooltip="Infusable relic"
      >
        <ItemName item={item} />
      </IconDisplay>
    )
  }

  if (isShield(item)) {
    return (
      <IconDisplay
        description={isEquipped ? <span>Equipped</span> : undefined}
        Icon={IconShield}
        tooltip="Shield"
      >
        <ShieldName overlayPlacement={overlayPlacement} shield={item} />
      </IconDisplay>
    )
  }

  if (isRelicItem(item)) {
    const { name } = item

    return (
      <IconDisplay
        description={
          name === `ammunition pouch` ? (
            <AmmunitionPouchStatus />
          ) : name === `lacrimatory` ? (
            <LacrimatoryStatus />
          ) : equippedRelics[name] ? (
            <span>Equipped</span>
          ) : undefined
        }
        Icon={RELICS[name].Icon}
        tooltip="Relic"
      >
        <ItemName item={item} />
      </IconDisplay>
    )
  }

  if (isWeapon(item)) {
    return (
      <IconDisplay
        description={isEquipped ? <span>Equipped</span> : undefined}
        Icon={getGearIcon(item)}
        tooltip="Weapon"
      >
        <WeaponName overlayPlacement={overlayPlacement} weapon={item} />
      </IconDisplay>
    )
  }

  return (
    <IconDisplay Icon={GEMS[item.name].Icon} tooltip="Gem">
      <ItemName amount={amount} item={item} />
    </IconDisplay>
  )
}

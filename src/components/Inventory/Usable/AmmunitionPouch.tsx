import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import IconAmmunition from "@neverquest/icons/ammunition.svg?react";
import type { AmmunitionPouchItem } from "@neverquest/types";
import { formatNumber } from "@neverquest/utilities/formatters";

export function AmmunitionPouch({ item }: { item: AmmunitionPouchItem }) {
  const { current, maximum } = item;

  return (
    <ItemDisplay
      description={
        <IconDisplay
          Icon={IconAmmunition}
          iconProps={{ isSmall: true, overlayPlacement: "bottom" }}
          tooltip="Ammunition pouch"
        >{`${formatNumber({ value: current })}/${formatNumber({ value: maximum })}`}</IconDisplay>
      }
      isInInventory
      item={item}
    />
  );
}

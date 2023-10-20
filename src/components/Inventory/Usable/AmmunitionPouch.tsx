import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import IconAmmunition from "@neverquest/icons/ammunition.svg?react";
import type { AmmunitionPouchItem } from "@neverquest/types";
import { formatValue } from "@neverquest/utilities/formatters";

export function AmmunitionPouch({ item }: { item: AmmunitionPouchItem }) {
  const { current, maximum } = item;

  return (
    <ItemDisplay
      description={
        <IconDisplay
          contents={`${formatValue({ value: current })}/${formatValue({ value: maximum })}`}
          Icon={IconAmmunition}
          iconProps={{ overlayPlacement: "bottom", size: "small" }}
          tooltip="Ammunition pouch"
        />
      }
      item={item}
      overlayPlacement="right"
    />
  );
}

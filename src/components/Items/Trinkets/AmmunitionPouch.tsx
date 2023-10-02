import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { ReactComponent as IconAmmunition } from "@neverquest/icons/ammunition.svg";
import type { TrinketItemAmmunitionPouch } from "@neverquest/types";
import { formatValue } from "@neverquest/utilities/formatters";

export function AmmunitionPouch({ item }: { item: TrinketItemAmmunitionPouch }) {
  const { current, maximum } = item;

  return (
    <ItemDisplay
      description={
        <IconDisplay
          contents={`${formatValue({ value: current })}/${formatValue({ value: maximum })}`}
          Icon={IconAmmunition}
          iconProps={{ overlayPlacement: "bottom", size: "tiny" }}
          tooltip="Ammunition"
        />
      }
      item={item}
      overlayPlacement="right"
    />
  );
}

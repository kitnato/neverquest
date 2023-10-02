import { IconDisplay } from "@neverquest/components/IconDisplay";
import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { ReactComponent as IconInfusionLevel } from "@neverquest/icons/infusion-level.svg";
import type { TrinketItemMonkeyPaw } from "@neverquest/types";
import { formatValue } from "@neverquest/utilities/formatters";

export function MonkeyPaw({ item }: { item: TrinketItemMonkeyPaw }) {
  const { level } = item;

  return (
    <ItemDisplay
      description={
        <IconDisplay
          contents={formatValue({ value: level })}
          Icon={IconInfusionLevel}
          iconProps={{ overlayPlacement: "bottom", size: "tiny" }}
          tooltip="Infusion level"
        />
      }
      item={item}
      overlayPlacement="right"
    />
  );
}

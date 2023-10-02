import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { InfusionLevel } from "@neverquest/components/Items/Trinkets/InfusionLevel";
import type { TrinketItemMonkeyPaw } from "@neverquest/types";

export function MonkeyPaw({ item }: { item: TrinketItemMonkeyPaw }) {
  const { level } = item;

  return (
    <ItemDisplay
      description={<InfusionLevel level={level} overlayPlacement="bottom" />}
      item={item}
      overlayPlacement="right"
    />
  );
}

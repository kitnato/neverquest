import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { InfusionLevelDisplay } from "@neverquest/components/Items/Trinkets/InfusionLevelDisplay";
import type { TrinketItemInfusable } from "@neverquest/types";

export function MonkeyPaw({ item }: { item: TrinketItemInfusable }) {
  const { level } = item;

  return (
    <ItemDisplay
      description={<InfusionLevelDisplay level={level} />}
      item={item}
      overlayPlacement="right"
    />
  );
}

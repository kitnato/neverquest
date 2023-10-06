import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { InfusionLevelDisplay } from "@neverquest/components/Items/Usable/Infusion/InfusionLevelDisplay";
import type { InfusableItem } from "@neverquest/types";

export function Infusable({ item }: { item: InfusableItem }) {
  const { level } = item;

  return (
    <ItemDisplay
      description={<InfusionLevelDisplay level={level} />}
      item={item}
      overlayPlacement="right"
    />
  );
}

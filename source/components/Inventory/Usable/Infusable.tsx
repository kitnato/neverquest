import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { InfusionLevelDisplay } from "@neverquest/components/Inventory/Usable/Infusion/InfusionLevelDisplay";
import type { InfusableItem } from "@neverquest/types";

export function Infusable({ item }: { item: InfusableItem }) {
  const { level } = item;

  return (
    <ItemDisplay description={<InfusionLevelDisplay level={level} />} isInInventory item={item} />
  );
}

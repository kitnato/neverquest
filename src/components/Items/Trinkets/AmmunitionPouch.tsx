import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import type { TrinketItemAmmunitionPouch } from "@neverquest/types";

export function AmmunitionPouch({ item }: { item: TrinketItemAmmunitionPouch }) {
  const { current, maximum } = item;

  return <ItemDisplay extra={` (${current}/${maximum})`} item={item} overlayPlacement="right" />;
}

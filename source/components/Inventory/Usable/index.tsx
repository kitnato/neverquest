import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { AmmunitionPouch } from "@neverquest/components/Inventory/Usable/AmmunitionPouch";
import { Infusable } from "@neverquest/components/Inventory/Usable/Infusable";
import type { InheritableItem } from "@neverquest/types";
import { isInfusableItem, isTrinketItem } from "@neverquest/types/type-guards";

export function Usable({ item }: { item: InheritableItem }) {
  if (isInfusableItem(item)) {
    return <Infusable item={item} />;
  }

  if (isTrinketItem(item)) {
    return <ItemDisplay isInInventory item={item} />;
  }

  return <AmmunitionPouch item={item} />;
}

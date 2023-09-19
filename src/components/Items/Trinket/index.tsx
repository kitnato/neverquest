import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { AmmunitionPouch } from "@neverquest/components/Items/Trinket/AmmunitionPouch";
import type { TrinketItem } from "@neverquest/types";

export function Trinket({ item }: { item: TrinketItem }) {
  return item.type === "ammunition pouch" ? <AmmunitionPouch /> : <ItemDisplay item={item} />;
}

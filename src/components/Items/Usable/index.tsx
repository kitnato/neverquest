import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { AmmunitionPouch } from "@neverquest/components/Items/Usable/AmmunitionPouch";
import { Infusable } from "@neverquest/components/Items/Usable/Infusable";
import type { UsableItem } from "@neverquest/types";
import { isInfusable, isTrinket } from "@neverquest/types/type-guards";

export function Usable({ item }: { item: UsableItem }) {
  if (isInfusable(item)) {
    return <Infusable item={item} />;
  }

  if (isTrinket(item)) {
    return <ItemDisplay item={item} overlayPlacement="right" />;
  }

  return <AmmunitionPouch item={item} />;
}

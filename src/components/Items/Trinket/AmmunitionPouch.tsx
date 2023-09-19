import { useRecoilValue } from "recoil";

import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { merchantInventory } from "@neverquest/state/caravan";
import { ownedItem } from "@neverquest/state/items";
import type { TrinketItemAmmunitionPouch } from "@neverquest/types";
import { isTrinket } from "@neverquest/types/type-guards";

export function AmmunitionPouch() {
  const ownedAmmunitionPouch = useRecoilValue(ownedItem("ammunition pouch"));
  const merchantInventoryValue = useRecoilValue(merchantInventory);

  const ammunitionPouch =
    ownedAmmunitionPouch ??
    merchantInventoryValue.find(({ item }) => isTrinket(item) && item.type === "ammunition pouch")
      ?.item ??
    null;

  if (ammunitionPouch === null) {
    return null;
  }

  const { current, maximum } = ammunitionPouch as TrinketItemAmmunitionPouch;

  return (
    <ItemDisplay
      extra={` (${current}/${maximum})`}
      item={ammunitionPouch}
      overlayPlacement="right"
    />
  );
}

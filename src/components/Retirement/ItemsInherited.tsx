import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { Infusable } from "@neverquest/components/Inventory/Usable/Infusable";
import { LABEL_NONE } from "@neverquest/data/general";
import { TRINKETS } from "@neverquest/data/inventory";
import { hasKnapsack, inventory } from "@neverquest/state/inventory";
import { ownedItem } from "@neverquest/state/items";
import type { InfusableItem } from "@neverquest/types";
import { isInfusable } from "@neverquest/types/type-guards";

export function ItemsInherited() {
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const inventoryValue = useRecoilValue(inventory);
  const ownedItemJournal = useRecoilValue(ownedItem("journal"));

  const infusables = inventoryValue.filter((current) => isInfusable(current));

  return (
    <Stack gap={3}>
      <h6>Items inherited</h6>

      {infusables.length === 0 && !hasKnapsackValue && ownedItemJournal === null && (
        <span className="fst-italic">{LABEL_NONE}</span>
      )}

      {hasKnapsackValue && <ItemDisplay item={TRINKETS.knapsack.item} overlayPlacement="right" />}

      {ownedItemJournal !== null && (
        <ItemDisplay item={TRINKETS.journal.item} overlayPlacement="right" />
      )}

      {infusables.map((current) => (
        <Infusable item={current as InfusableItem} key={current.id} />
      ))}
    </Stack>
  );
}

import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { Infusable } from "@neverquest/components/Inventory/Usable/Infusable";
import { TRINKETS } from "@neverquest/data/inventory";
import { hasKnapsack, inventory } from "@neverquest/state/inventory";
import type { InfusableItem } from "@neverquest/types";
import { isInfusable } from "@neverquest/types/type-guards";

export function ItemsInherited() {
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const inventoryValue = useRecoilValue(inventory);

  return (
    <Stack gap={3}>
      <h6>Items inherited</h6>

      {hasKnapsackValue && <ItemDisplay item={TRINKETS.knapsack.item} overlayPlacement="right" />}

      {inventoryValue
        .filter((current) => isInfusable(current))
        .map((current) => (
          <Infusable item={current as InfusableItem} key={current.id} />
        ))}
    </Stack>
  );
}

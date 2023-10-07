import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { TRINKETS } from "@neverquest/data/inventory";
import { hasKnapsack } from "@neverquest/state/inventory";
import { ownedItem } from "@neverquest/state/items";

export function ItemsInherited() {
  const hasKnapsackValue = useRecoilValue(hasKnapsack);
  const ownedAntiqueCoin = useRecoilValue(ownedItem("antique coin"));

  return (
    <Stack gap={3}>
      <h6>Items inherited</h6>

      {hasKnapsackValue && <ItemDisplay item={TRINKETS.knapsack.item} />}

      {ownedAntiqueCoin !== null && <ItemDisplay item={ownedAntiqueCoin} />}
    </Stack>
  );
}

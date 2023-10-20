import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { TransmuteGems } from "@neverquest/components/Caravan/Alchemist/TransmuteGems";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { inventory } from "@neverquest/state/inventory";
import { isGem } from "@neverquest/types/type-guards";
import { stackItems } from "@neverquest/utilities/helpers";

export function Alchemist() {
  const inventoryValue = useRecoilValue(inventory);

  return (
    <Stack gap={5}>
      <Stack gap={3}>
        <h6>Inventory</h6>

        {stackItems(
          inventoryValue
            .filter(isGem)
            .toSorted((current1, current2) => current1.name.localeCompare(current2.name)),
        ).map(({ item, stack }) => (
          <ItemDisplay item={item} key={item.id} overlayPlacement="right" stack={stack} />
        ))}
      </Stack>

      <Stack gap={3}>
        <h6>Transmute gems</h6>

        <TransmuteGems />
      </Stack>
    </Stack>
  );
}

import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { LearnOvumInfusion } from "@neverquest/components/Caravan/Alchemist/LearnOvumInfusion";
import { TransmuteGems } from "@neverquest/components/Caravan/Alchemist/TransmuteGems";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { LABEL_NONE_AVAILABLE } from "@neverquest/data/general";
import { inventory } from "@neverquest/state/inventory";
import { isGemItem } from "@neverquest/types/type-guards";
import { stackItems } from "@neverquest/utilities/helpers";

export function Alchemist() {
  const inventoryValue = useRecoilValue(inventory);

  const gemsInventory = stackItems(
    inventoryValue
      .filter(isGemItem)
      .toSorted((current1, current2) => current1.name.localeCompare(current2.name)),
  );

  return (
    <Stack gap={5}>
      <Stack gap={3}>
        <h6>Inventory</h6>

        {gemsInventory.length === 0 ? (
          <span className="fst-italic">{LABEL_NONE_AVAILABLE}</span>
        ) : (
          gemsInventory.map(({ item, stack }) => (
            <ItemDisplay item={item} key={item.ID} stack={stack} />
          ))
        )}
      </Stack>

      <Stack gap={3}>
        <h6>Transmute gems</h6>

        <TransmuteGems />
      </Stack>

      <LearnOvumInfusion />
    </Stack>
  );
}

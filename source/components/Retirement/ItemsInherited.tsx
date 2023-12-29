import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { LABEL_NONE } from "@neverquest/data/general";
import { inventory } from "@neverquest/state/inventory";
import { isInheritableItem } from "@neverquest/types/type-guards";

export function ItemsInherited() {
  const inventoryValue = useRecoilValue(inventory);

  const ownedInheritableItems = inventoryValue.filter(isInheritableItem);

  return (
    <Stack gap={3}>
      <h6>Items inherited</h6>

      {ownedInheritableItems.length === 0 ? (
        <span className="fst-italic">{LABEL_NONE}</span>
      ) : (
        ownedInheritableItems.map((inheritableItem) => (
          <ItemDisplay item={inheritableItem} key={inheritableItem.ID} />
        ))
      )}
    </Stack>
  );
}

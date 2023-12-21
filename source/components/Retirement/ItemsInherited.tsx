import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { Infusable } from "@neverquest/components/Inventory/Usable/Infusable";
import { LABEL_NONE } from "@neverquest/data/general";
import { inventory } from "@neverquest/state/inventory";
import { isInheritableItem, isTrinketItem } from "@neverquest/types/type-guards";

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
          <div key={inheritableItem.ID} style={{ width: "max-content" }}>
            {isTrinketItem(inheritableItem) ? (
              <ItemDisplay isInInventory item={inheritableItem} />
            ) : (
              <Infusable item={inheritableItem} />
            )}
          </div>
        ))
      )}
    </Stack>
  );
}

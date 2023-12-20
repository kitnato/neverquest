import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { Infusable } from "@neverquest/components/Inventory/Usable/Infusable";
import { LABEL_NONE } from "@neverquest/data/general";
import { INFUSABLES, TRINKETS } from "@neverquest/data/items";
import { inventory } from "@neverquest/state/inventory";
import { isInfusable, isTrinket, isUsableItem } from "@neverquest/types/type-guards";

export function ItemsInherited() {
  const inventoryValue = useRecoilValue(inventory);

  const ownedUsableItems = inventoryValue.filter(isUsableItem);

  return (
    <Stack gap={3}>
      <h6>Items inherited</h6>

      {ownedUsableItems.length === 0 ? (
        <span className="fst-italic">{LABEL_NONE}</span>
      ) : (
        Object.keys(ownedUsableItems).map((usableItem) => {
          if (isTrinket(usableItem)) {
            return (
              <ItemDisplay
                isInInventory
                item={TRINKETS[usableItem].item}
                key={TRINKETS[usableItem].item.ID}
              />
            );
          }

          if (isInfusable(usableItem)) {
            return (
              <Infusable item={INFUSABLES[usableItem].item} key={INFUSABLES[usableItem].item.ID} />
            );
          }
        })
      )}
    </Stack>
  );
}

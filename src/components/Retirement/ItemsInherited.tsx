import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { Infusable } from "@neverquest/components/Inventory/Usable/Infusable";
import { LABEL_NONE } from "@neverquest/data/general";
import { INFUSABLES, TRINKETS } from "@neverquest/data/items";
import { ownsInheritableItems } from "@neverquest/state/items";
import { isInfusable, isTrinket } from "@neverquest/types/type-guards";

export function ItemsInherited() {
  const ownsInheritableItemsValue = useRecoilValue(ownsInheritableItems);

  return (
    <Stack gap={3}>
      <h6>Items inherited</h6>

      {Object.values(ownsInheritableItemsValue).every(
        (ownsInheritableItem) => !ownsInheritableItem,
      ) && <span className="fst-italic">{LABEL_NONE}</span>}

      {Object.keys(ownsInheritableItemsValue).map((inheritableItem) => {
        if (isTrinket(inheritableItem)) {
          return (
            <ItemDisplay
              isInInventory
              item={TRINKETS[inheritableItem].item}
              key={TRINKETS[inheritableItem].item.ID}
            />
          );
        }

        if (isInfusable(inheritableItem)) {
          return (
            <Infusable
              item={INFUSABLES[inheritableItem].item}
              key={INFUSABLES[inheritableItem].item.ID}
            />
          );
        }
      })}
    </Stack>
  );
}

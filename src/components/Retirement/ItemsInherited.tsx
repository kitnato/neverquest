import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { Infusable } from "@neverquest/components/Inventory/Usable/Infusable";
import { LABEL_NONE } from "@neverquest/data/general";
import { INFUSABLES, TRINKETS } from "@neverquest/data/inventory";
import { ownsInheritableItems } from "@neverquest/state/items";
import { isInfusable, isTrinket } from "@neverquest/types/type-guards";

export function ItemsInherited() {
  const ownsInheritableItemsValue = useRecoilValue(ownsInheritableItems);

  return (
    <Stack gap={3}>
      <h6>Items inherited</h6>

      {Object.values(ownsInheritableItemsValue).every((current) => !current) && (
        <span className="fst-italic">{LABEL_NONE}</span>
      )}

      {Object.keys(ownsInheritableItemsValue).map((current) => {
        if (isTrinket(current)) {
          return (
            <ItemDisplay
              item={TRINKETS[current].item}
              key={TRINKETS[current].item.ID}
              overlayPlacement="right"
            />
          );
        }

        if (isInfusable(current)) {
          return <Infusable item={INFUSABLES[current].item} key={INFUSABLES[current].item.ID} />;
        }
      })}
    </Stack>
  );
}

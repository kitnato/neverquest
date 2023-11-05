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

      {Object.values(ownsInheritableItemsValue).every((current) => current === false) && (
        <span className="fst-italic">{LABEL_NONE}</span>
      )}

      {Object.entries(ownsInheritableItemsValue).map(([key, current]) => {
        if (current === false) {
          return null;
        }

        if (isTrinket(key)) {
          return (
            <ItemDisplay
              item={TRINKETS[key].item}
              key={TRINKETS[key].item.id}
              overlayPlacement="right"
            />
          );
        }

        if (isInfusable(key)) {
          return <Infusable item={INFUSABLES[key].item} key={INFUSABLES[key].item.id} />;
        }

        return null;
      })}
    </Stack>
  );
}

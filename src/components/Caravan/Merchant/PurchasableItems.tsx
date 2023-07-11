import { Stack } from "react-bootstrap";

import { PurchaseItem } from "@neverquest/components/Caravan/Merchant/PurchaseItem";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import type { Item } from "@neverquest/types";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";

export function PurchasableItems({ items }: { items: Item[] }) {
  return (
    <>
      {items.map((item) => {
        const { coinPrice, id } = item;

        return (
          <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={id}>
            <ItemDisplay item={item} overlayPlacement="right" />

            <Stack direction="horizontal" gap={3}>
              <ResourceDisplay tooltip="Price (coins)" type="coins" value={coinPrice} />

              <PurchaseItem item={item} />
            </Stack>
          </div>
        );
      })}
    </>
  );
}

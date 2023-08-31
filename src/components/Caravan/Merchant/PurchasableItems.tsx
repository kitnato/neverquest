import { Stack } from "react-bootstrap";

import { PurchaseItem } from "@neverquest/components/Caravan/Merchant/PurchaseItem";
import { ItemDisplay } from "@neverquest/components/Items/ItemDisplay";
import { ResourceDisplay } from "@neverquest/components/Resources/ResourceDisplay";
import type { InventoryItem } from "@neverquest/types";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/utilities/constants";
import { stackItems } from "@neverquest/utilities/helpers";

export function PurchasableItems({ items }: { items: InventoryItem[] }) {
  return (
    <>
      {stackItems(items).map(({ item, stack }) => {
        const { coinPrice, id } = item;

        return (
          <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={id}>
            <ItemDisplay item={item} overlayPlacement="right" stack={stack} />

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

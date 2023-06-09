import { Stack } from "react-bootstrap";

import { PurchaseItemButton } from "@neverquest/components/Caravan/Merchant/PurchaseItemButton";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { Coins } from "@neverquest/components/Resources/Coins";
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
              <Coins tooltip="Price (coins)" value={coinPrice} />

              <PurchaseItemButton item={item} />
            </Stack>
          </div>
        );
      })}
    </>
  );
}

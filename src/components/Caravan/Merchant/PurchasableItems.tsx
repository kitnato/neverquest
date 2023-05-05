import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { PurchaseItemButton } from "@neverquest/components/Caravan/Merchant/PurchaseItemButton";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { Coins } from "@neverquest/components/Resources/Coins";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/data/constants";
import { merchantInventory } from "@neverquest/state/caravan";

export function PurchasableItems({ inventoryIDs }: { inventoryIDs: string[] }) {
  const merchantInventoryValue = useRecoilValue(merchantInventory);

  return (
    <>
      {inventoryIDs.map((id) => {
        const { item } = merchantInventoryValue[id];
        const { coinPrice } = item;

        return (
          <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={id}>
            <ItemDisplay item={item} overlayPlacement="right" />

            <Stack direction="horizontal" gap={3}>
              <Coins tooltip="Price (coins)" value={coinPrice} />

              <PurchaseItemButton id={id} />
            </Stack>
          </div>
        );
      })}
    </>
  );
}

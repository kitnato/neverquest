import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { BuyItemButton } from "@neverquest/components/Caravan/Merchant/BuyItemButton";
import { ItemDisplay } from "@neverquest/components/Inventory/ItemDisplay";
import { Coins } from "@neverquest/components/Resources/Coins";
import { CLASS_FULL_WIDTH_JUSTIFIED } from "@neverquest/constants";
import { merchantInventory } from "@neverquest/state/caravan";

export function PurchasableItems({ inventoryIDs }: { inventoryIDs: string[] }) {
  const merchantInventoryValue = useRecoilValue(merchantInventory);

  return (
    <>
      {inventoryIDs.map((id) => {
        const { item, key } = merchantInventoryValue[id];
        const { coinPrice } = item;

        return (
          <div className={CLASS_FULL_WIDTH_JUSTIFIED} key={key}>
            <ItemDisplay item={item} overlayPlacement="right" />

            <Stack direction="horizontal" gap={3}>
              <Coins tooltip="Price (coins)" value={coinPrice} />

              <BuyItemButton id={id} />
            </Stack>
          </div>
        );
      })}
    </>
  );
}

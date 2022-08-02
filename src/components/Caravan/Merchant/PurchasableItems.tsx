import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import BuyItemButton from "@neverquest/components/Caravan/Merchant/BuyItemButton";
import InventoryElement from "@neverquest/components/Inventory/InventoryElement";
import Coins from "@neverquest/components/Resource/Coins";
import { merchantInventory } from "@neverquest/state/caravan";

export default function PurchasableItems({ inventoryIDs }: { inventoryIDs: symbol[] }) {
  const merchantInventoryValue = useRecoilValue(merchantInventory);

  return (
    <>
      {inventoryIDs.map((id) => {
        const { item, key } = merchantInventoryValue[id];

        return (
          <div className="align-items-center d-flex justify-content-between w-100" key={key}>
            <InventoryElement item={item} />

            <Stack direction="horizontal" gap={3}>
              <Coins tooltip="Price (coins)" value={item.price} />

              <BuyItemButton id={id} />
            </Stack>
          </div>
        );
      })}
    </>
  );
}

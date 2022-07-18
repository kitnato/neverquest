import { useAtomValue } from "jotai";
import { Stack } from "react-bootstrap";

import BuyItemButton from "@neverquest/components/Caravan/Merchant/BuyItemButton";
import InventoryElement from "@neverquest/components/Inventory/InventoryElement";
import Coins from "@neverquest/components/Resource/Coins";
import { merchantInventory } from "@neverquest/state/caravan";

export default function BuyItems() {
  const merchantInventoryValue = useAtomValue(merchantInventory);

  const newItemIDs = Object.getOwnPropertySymbols(merchantInventoryValue).filter(
    (id) => !merchantInventoryValue[id].isReturned
  );
  const returnedItemIDs = Object.getOwnPropertySymbols(merchantInventoryValue).filter(
    (id) => merchantInventoryValue[id].isReturned
  );

  const PurchasableItems = ({ inventoryIDs }: { inventoryIDs: symbol[] }) => (
    <>
      {inventoryIDs.map((id) => {
        const { item, key } = merchantInventoryValue[id];

        return (
          <div className="align-items-center d-flex justify-content-between w-100" key={key}>
            <Stack direction="horizontal" gap={5}>
              <InventoryElement item={item} />

              <Coins tooltip="Price (coins)" value={item.price} />
            </Stack>

            <BuyItemButton id={id} />
          </div>
        );
      })}
    </>
  );

  return (
    <Stack gap={5}>
      <Stack gap={3}>
        <h6>Buy items</h6>

        {newItemIDs.length === 0 ? (
          <span className="fst-italic">Nothing available.</span>
        ) : (
          <PurchasableItems inventoryIDs={newItemIDs} />
        )}
      </Stack>

      {returnedItemIDs.length > 0 && (
        <Stack gap={3}>
          <h6>Buy back items</h6>

          <PurchasableItems inventoryIDs={returnedItemIDs} />
        </Stack>
      )}
    </Stack>
  );
}

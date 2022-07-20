import { useAtomValue } from "jotai";
import { Stack } from "react-bootstrap";

import PurchasableItems from "@neverquest/components/Caravan/Merchant/PurchasableItems";
import { merchantInventory } from "@neverquest/state/caravan";

export default function BuyItems() {
  const merchantInventoryValue = useAtomValue(merchantInventory);

  const newItemIDs = Object.getOwnPropertySymbols(merchantInventoryValue).filter(
    (id) => !merchantInventoryValue[id].isReturned
  );

  return (
    <Stack gap={3}>
      <h6>Buy items</h6>

      {newItemIDs.length === 0 ? (
        <span className="fst-italic">Nothing available.</span>
      ) : (
        <PurchasableItems inventoryIDs={newItemIDs} />
      )}
    </Stack>
  );
}

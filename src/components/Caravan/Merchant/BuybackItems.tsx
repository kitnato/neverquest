import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import PurchasableItems from "@neverquest/components/Caravan/Merchant/PurchasableItems";
import { merchantInventory } from "@neverquest/state/caravan";

export default function () {
  const merchantInventoryValue = useRecoilValue(merchantInventory);

  const returnedItemIDs = Object.getOwnPropertySymbols(merchantInventoryValue).filter(
    (id) => merchantInventoryValue[id].isReturned
  );

  if (returnedItemIDs.length === 0) {
    return null;
  }

  return (
    <Stack gap={3}>
      <h6>Buy back items</h6>

      <PurchasableItems inventoryIDs={returnedItemIDs} />
    </Stack>
  );
}

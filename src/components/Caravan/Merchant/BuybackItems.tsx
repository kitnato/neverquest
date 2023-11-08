import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { PurchasableItems } from "@neverquest/components/Caravan/Merchant/PurchasableItems";
import { merchantInventory } from "@neverquest/state/caravan";

export function BuybackItems() {
  const merchantInventoryValue = useRecoilValue(merchantInventory);

  const returnedItems = merchantInventoryValue.filter(({ isReturned }) => isReturned);

  if (returnedItems.length === 0) {
    return null;
  }

  return (
    <Stack gap={3}>
      <h6>Buy back items</h6>

      <PurchasableItems merchantItems={returnedItems} />
    </Stack>
  );
}

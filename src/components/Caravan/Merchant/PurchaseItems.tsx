import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import PurchasableItems from "@neverquest/components/Caravan/Merchant/PurchasableItems";
import { merchantInventory } from "@neverquest/state/caravan";

export default function () {
  const merchantInventoryValue = useRecoilValue(merchantInventory);

  const newItemIDs = Object.getOwnPropertyNames(merchantInventoryValue).filter(
    (id) => !merchantInventoryValue[id].isReturned
  );

  return (
    <Stack gap={3}>
      <h6>Purchase items</h6>

      {newItemIDs.length === 0 ? (
        <span className="fst-italic">Nothing available.</span>
      ) : (
        <PurchasableItems inventoryIDs={newItemIDs} />
      )}
    </Stack>
  );
}

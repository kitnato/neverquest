import Stack from "react-bootstrap/Stack";

import BuyBackItems from "@neverquest/components/Caravan/Merchant/BuyBackItems";
import PurchaseItems from "@neverquest/components/Caravan/Merchant/PurchaseItems";
import SellScrap from "@neverquest/components/Caravan/Merchant/SellScrap";
import SellItems from "@neverquest/components/Caravan/Merchant/SellItems";

export default function () {
  return (
    <Stack gap={5}>
      <SellScrap />

      <PurchaseItems />

      <BuyBackItems />

      <SellItems />
    </Stack>
  );
}

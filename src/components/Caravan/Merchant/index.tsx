import Stack from "react-bootstrap/Stack";

import { BuybackItems } from "@neverquest/components/Caravan/Merchant/BuybackItems";
import { PurchaseItems } from "@neverquest/components/Caravan/Merchant/PurchaseItems";
import { SellItems } from "@neverquest/components/Caravan/Merchant/SellItems";
import { SellScrap } from "@neverquest/components/Caravan/Merchant/SellScrap";

export function Merchant() {
  return (
    <Stack gap={5}>
      <SellScrap />

      <PurchaseItems />

      <BuybackItems />

      <SellItems />
    </Stack>
  );
}

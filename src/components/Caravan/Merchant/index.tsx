import Stack from "react-bootstrap/Stack";

import BuybackItems from "@neverquest/components/Caravan/Merchant/BuybackItems";
import BuyItems from "@neverquest/components/Caravan/Merchant/BuyItems";
import SellScrap from "@neverquest/components/Caravan/Merchant/SellScrap";
import SellItems from "@neverquest/components/Caravan/Merchant/SellItems";

export default function Merchant() {
  return (
    <Stack gap={5}>
      <SellScrap />

      <BuyItems />

      <BuybackItems />

      <SellItems />
    </Stack>
  );
}

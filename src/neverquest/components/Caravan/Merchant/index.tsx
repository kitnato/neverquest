import Stack from "react-bootstrap/Stack";

import BuyItems from "neverquest/components/Caravan/Merchant/BuyItems";
import SellScrap from "neverquest/components/Caravan/Merchant/SellScrap";
import SellItems from "neverquest/components/Caravan/Merchant/SellItems";

export default function Merchant() {
  return (
    <Stack gap={5}>
      <div>
        <h6>Sell resources</h6>

        <SellScrap />
      </div>

      <SellItems />

      <BuyItems />
    </Stack>
  );
}

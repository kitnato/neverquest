import Stack from "react-bootstrap/Stack";

import BuyItems from "components/Caravan/Merchant/BuyItems";
import SellScrap from "components/Caravan/Merchant/SellScrap";
import SellItems from "components/Caravan/Merchant/SellItems";

export default function Merchant() {
  return (
    <Stack gap={4}>
      <SellScrap />

      <SellItems />

      <BuyItems />
    </Stack>
  );
}

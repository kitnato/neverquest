import { Stack } from "react-bootstrap"

import { BuybackItems } from "@neverquest/components/Caravan/Merchant/BuybackItems"
import { PurchaseItems } from "@neverquest/components/Caravan/Merchant/PurchaseItems"
import { SellItems } from "@neverquest/components/Caravan/Merchant/SellItems"

export function Merchant() {
  return (
    <Stack gap={5}>
      <PurchaseItems />

      <BuybackItems />

      <SellItems />
    </Stack>
  )
}

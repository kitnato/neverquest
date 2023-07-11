import { Stack } from "react-bootstrap";

import { PurgeEssence } from "@neverquest/components/Caravan/Occultist/PurgeEssence";
import { PurchaseConsumable } from "@neverquest/components/Caravan/PurchaseConsumable";

export function Occultist() {
  return (
    <Stack gap={5}>
      <Stack gap={3}>
        <h6>Purchase soulstones</h6>

        <PurchaseConsumable type="soulstone" />
      </Stack>

      <PurgeEssence />
    </Stack>
  );
}

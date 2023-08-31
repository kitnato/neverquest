import { Stack } from "react-bootstrap";

import { PurgeEssence } from "@neverquest/components/Caravan/Occultist/PurgeEssence";
import { PurchaseConsumable } from "@neverquest/components/Caravan/PurchaseConsumable";

export function Occultist() {
  return (
    <Stack gap={5}>
      <Stack gap={3}>
        <h6>Purchase phylacteries</h6>

        <PurchaseConsumable type="phylactery" />
      </Stack>

      <PurgeEssence />
    </Stack>
  );
}

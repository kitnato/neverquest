import { Stack } from "react-bootstrap";

import { PurgeEssence } from "@neverquest/components/Caravan/Occultist/PurgeEssence";
import { PurgeMemories } from "@neverquest/components/Caravan/Occultist/PurgeMemories";
import { PurchaseConsumable } from "@neverquest/components/Caravan/PurchaseConsumable";

export function Occultist() {
  return (
    <Stack gap={5}>
      <Stack gap={3}>
        <h6>Purchase phylacteries</h6>

        <PurchaseConsumable consumable="phylactery" />
      </Stack>

      <Stack gap={3}>
        <h6>Rituals</h6>

        <PurgeEssence />

        <PurgeMemories />
      </Stack>
    </Stack>
  );
}

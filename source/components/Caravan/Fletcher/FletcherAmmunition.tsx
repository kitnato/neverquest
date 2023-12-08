import { Stack } from "react-bootstrap";

import { AmmunitionPouchCurrent } from "@neverquest/components/Caravan/Fletcher/AmmunitionPouchCurrent";
import { PurchaseAmmunition } from "@neverquest/components/Caravan/Fletcher/PurchaseAmmunition";

export function FletcherAmmunition() {
  return (
    <Stack gap={5}>
      <Stack gap={3}>
        <h6>Current ammunition</h6>

        <AmmunitionPouchCurrent />
      </Stack>

      <Stack gap={3}>
        <h6>Purchase ammunition</h6>

        <PurchaseAmmunition />
      </Stack>
    </Stack>
  );
}

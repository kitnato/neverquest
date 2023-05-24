import { Stack } from "react-bootstrap";

import { PurchaseBandages } from "@neverquest/components/Caravan/Medic/PurchaseBandages";
import { ReceiveHealing } from "@neverquest/components/Caravan/Medic/ReceiveHealing";

export function Medic() {
  return (
    <Stack gap={5}>
      <PurchaseBandages />

      <ReceiveHealing />
    </Stack>
  );
}

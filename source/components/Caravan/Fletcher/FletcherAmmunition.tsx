import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { AmmunitionPouch } from "@neverquest/components/Caravan/Fletcher/AmmunitionPouch";
import { PurchaseAmmunition } from "@neverquest/components/Caravan/Fletcher/PurchaseAmmunition";
import { ownedItem } from "@neverquest/state/inventory";

export function FletcherAmmunition() {
  const ownedAmmunitionPouch = useRecoilValue(ownedItem("ammunition pouch"));

  if (ownedAmmunitionPouch === undefined) {
    return <span className="fst-italic">Nowhere to store ammunition.</span>;
  }

  return (
    <Stack gap={5}>
      <Stack gap={3}>
        <h6>Current ammunition</h6>

        <AmmunitionPouch />
      </Stack>

      <Stack gap={3}>
        <h6>Purchase ammunition</h6>

        <PurchaseAmmunition />
      </Stack>
    </Stack>
  );
}

import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ExpandAmmunitionPouch } from "@neverquest/components/Caravan/Tailor/ExpandAmmunitionPouch";
import { ExpandKnapsack } from "@neverquest/components/Caravan/Tailor/ExpandKnapsack";
import { Encumbrance } from "@neverquest/components/Inventory/Encumbrance";
import { AmmunitionPouchCapacity } from "@neverquest/components/Inventory/Usable/AmmunitionPouch/AmmunitionPouchCapacity";
import { ownedItem } from "@neverquest/state/items";

export function Tailor() {
  const ownedAmmunitionPouch = useRecoilValue(ownedItem("ammunition pouch"));

  return (
    <Stack gap={5}>
      <Stack gap={3}>
        <h6>Knapsack</h6>

        <Encumbrance />

        <ExpandKnapsack />
      </Stack>

      {ownedAmmunitionPouch !== null && (
        <Stack gap={3}>
          <h6>Ammunition pouch</h6>

          <AmmunitionPouchCapacity />

          <ExpandAmmunitionPouch />
        </Stack>
      )}
    </Stack>
  );
}

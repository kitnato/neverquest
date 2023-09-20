import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ExpandAmmunitionPouch } from "@neverquest/components/Caravan/Tailor/ExpandAmmunitionPouch";
import { ExpandKnapsack } from "@neverquest/components/Caravan/Tailor/ExpandKnapsack";
import { Encumbrance } from "@neverquest/components/Items/Encumbrance";
import { AmmunitionPouch } from "@neverquest/components/Items/Trinket/AmmunitionPouch";
import { ownedItem } from "@neverquest/state/items";

export function Tailor() {
  const ownedAmmunitionPouch = useRecoilValue(ownedItem("ammunition pouch"));

  return (
    <Stack gap={5}>
      <Stack gap={3}>
        <h6>Current knapsack</h6>

        <Encumbrance />

        <h6>Expand knapsack</h6>

        <ExpandKnapsack />
      </Stack>

      {ownedAmmunitionPouch !== null && (
        <>
          <Stack gap={3}>
            <h6>Current ammunition pouch</h6>

            <AmmunitionPouch />

            <h6>Expand ammunition pouch</h6>

            <ExpandAmmunitionPouch />
          </Stack>
        </>
      )}
    </Stack>
  );
}

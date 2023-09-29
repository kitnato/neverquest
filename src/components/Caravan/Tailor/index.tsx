import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ExpandAmmunitionPouch } from "@neverquest/components/Caravan/Tailor/ExpandAmmunitionPouch";
import { ExpandKnapsack } from "@neverquest/components/Caravan/Tailor/ExpandKnapsack";
import { Encumbrance } from "@neverquest/components/Items/Encumbrance";
import { AmmunitionPouch } from "@neverquest/components/Items/Trinkets/AmmunitionPouch";
import { ownedItem } from "@neverquest/state/items";
import type { TrinketItemAmmunitionPouch } from "@neverquest/types";

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

            <AmmunitionPouch item={ownedAmmunitionPouch as TrinketItemAmmunitionPouch} />

            <h6>Expand ammunition pouch</h6>

            <ExpandAmmunitionPouch />
          </Stack>
        </>
      )}
    </Stack>
  );
}

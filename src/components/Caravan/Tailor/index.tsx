import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ExpandAmmunitionPouch } from "@neverquest/components/Caravan/Tailor/ExpandAmmunitionPouch";
import { ExpandKnapsack } from "@neverquest/components/Caravan/Tailor/ExpandKnapsack";
import { Encumbrance } from "@neverquest/components/Items/Encumbrance";
import { AmmunitionPouch } from "@neverquest/components/Items/Trinket/AmmunitionPouch";
import { inventory } from "@neverquest/state/inventory";
import type { TrinketItem } from "@neverquest/types";
import { isTrinket } from "@neverquest/types/type-guards";

export function Tailor() {
  const ammunitionPouch = useRecoilValue(inventory).find(
    (current) => isTrinket(current) && current.type === "ammunition pouch",
  ) as TrinketItem;

  return (
    <Stack gap={5}>
      <Stack gap={3}>
        <h6>Current knapsack</h6>

        <Encumbrance />

        <h6>Expand knapsack</h6>

        <ExpandKnapsack />
      </Stack>

      {ammunitionPouch !== undefined && (
        <>
          <Stack gap={3}>
            <h6>Current ammunition pouch</h6>

            <AmmunitionPouch item={ammunitionPouch} />

            <h6>Expand ammunition pouch</h6>

            <ExpandAmmunitionPouch />
          </Stack>
        </>
      )}
    </Stack>
  );
}

import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { ExpandAmmunitionPouch } from "@neverquest/components/Caravan/Tailor/ExpandAmmunitionPouch";
import { ExpandKnapsack } from "@neverquest/components/Caravan/Tailor/ExpandKnapsack";
import { ownedItem } from "@neverquest/state/inventory";

export function Tailor() {
  const ownedAmmunitionPouch = useRecoilValue(ownedItem("ammunition pouch"));
  const ownedItemKnapsack = useRecoilValue(ownedItem("knapsack"));

  if (ownedAmmunitionPouch === undefined && ownedItemKnapsack === undefined) {
    return <span>&quot;I&apos;m feeling a bit useless here ...&quot;</span>;
  }

  return (
    <Stack gap={5}>
      {ownedItemKnapsack !== undefined && <ExpandKnapsack />}

      {ownedAmmunitionPouch !== undefined && <ExpandAmmunitionPouch />}
    </Stack>
  );
}

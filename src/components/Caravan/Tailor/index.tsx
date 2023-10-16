import { Stack } from "react-bootstrap";

import { ExpandAmmunitionPouch } from "@neverquest/components/Caravan/Tailor/ExpandAmmunitionPouch";
import { ExpandKnapsack } from "@neverquest/components/Caravan/Tailor/ExpandKnapsack";

export function Tailor() {
  return (
    <Stack gap={5}>
      <ExpandKnapsack />

      <ExpandAmmunitionPouch />
    </Stack>
  );
}

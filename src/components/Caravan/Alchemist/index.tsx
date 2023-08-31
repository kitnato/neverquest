import { Stack } from "react-bootstrap";

import { TransmuteGems } from "@neverquest/components/Caravan/Alchemist/TransmuteGems";
import { TransmuteResources } from "@neverquest/components/Caravan/Alchemist/TransmuteResources";

export function Alchemist() {
  return (
    <Stack gap={3}>
      <h6>Transmute materials</h6>

      <Stack gap={5}>
        <TransmuteResources />

        <TransmuteGems />
      </Stack>
    </Stack>
  );
}

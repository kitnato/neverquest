import { Stack } from "react-bootstrap";

import { TransmuteGems } from "@neverquest/components/Caravan/Alchemist/TransmuteGems";

export function Alchemist() {
  return (
    <Stack gap={3}>
      <h6>Transmute gems</h6>

      <TransmuteGems />
    </Stack>
  );
}

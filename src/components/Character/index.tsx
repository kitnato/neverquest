import { Stack } from "react-bootstrap";

import { Status } from "@neverquest/components/Character/Status";
import { Gear } from "@neverquest/components/Inventory/Gear";
import { Resources } from "@neverquest/components/Inventory/Resources";
import { Statistics } from "@neverquest/components/Statistics";

export function Character() {
  return (
    <Stack gap={3}>
      <Status />

      <Statistics />

      <Resources />

      <Gear />
    </Stack>
  );
}

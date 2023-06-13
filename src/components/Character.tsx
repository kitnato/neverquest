import { Stack } from "react-bootstrap";

import { Gear } from "@neverquest/components/Inventory/Gear";
import { Resources } from "@neverquest/components/Inventory/Resources";
import { Statistics } from "@neverquest/components/Statistics";
import { Status } from "@neverquest/components/Status";

export function Character() {
  return (
    <Stack className="overlay-highlighted" gap={3}>
      <Status />

      <Statistics />

      <Gear />

      <Resources />
    </Stack>
  );
}

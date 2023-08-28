import { Stack } from "react-bootstrap";

import { GearDisplay } from "@neverquest/components/Items/GearDisplay";
import { Resources } from "@neverquest/components/Resources";
import { Statistics } from "@neverquest/components/Statistics";
import { Status } from "@neverquest/components/Status";

export function Character() {
  return (
    <Stack className="overlay-highlighted" gap={3}>
      <Status />

      <Statistics />

      <GearDisplay />

      <Resources />
    </Stack>
  );
}

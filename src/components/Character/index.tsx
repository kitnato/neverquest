import Stack from "react-bootstrap/Stack";

import Status from "@neverquest/components/Character/Status";
import Gear from "@neverquest/components/Inventory/Gear";
import Resources from "@neverquest/components/Inventory/Resources";

export default function Character() {
  return (
    <Stack gap={3}>
      <Status />

      <Resources />

      <Gear />
    </Stack>
  );
}

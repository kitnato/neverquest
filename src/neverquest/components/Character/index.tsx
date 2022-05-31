import Stack from "react-bootstrap/Stack";

import Status from "neverquest/components/Character/Status";
import Equipment from "neverquest/components/Inventory/Equipment";
import Resources from "neverquest/components/Inventory/Resources";

export default function Character() {
  return (
    <Stack gap={3}>
      <Status />

      <Resources />

      <Equipment />
    </Stack>
  );
}

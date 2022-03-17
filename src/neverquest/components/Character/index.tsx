import Stack from "react-bootstrap/Stack";

import AttributesSummary from "neverquest/components/Character/AttributesSummary";
import Status from "neverquest/components/Character/Status";
import Inventory from "neverquest/components/Inventory";

export default function Character() {
  return (
    <Stack gap={3}>
      <Status />

      <Inventory />

      <AttributesSummary />
    </Stack>
  );
}

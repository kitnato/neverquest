import Stack from "react-bootstrap/Stack";

import AttributesSummary from "neverquest/components/Attributes/AttributesSummary";
import Status from "neverquest/components/Character/Status";
import Equipment from "neverquest/components/Inventory/Equipment";
import StoredLoot from "neverquest/components/Inventory/StoredLoot";

export default function Character() {
  return (
    <Stack gap={3}>
      <Status />

      <StoredLoot />

      <Equipment />

      <AttributesSummary />
    </Stack>
  );
}

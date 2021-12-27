import Stack from "react-bootstrap/Stack";

import AttributesSummary from "components/Character/AttributesSummary";
import Status from "components/Character/Status";
import Inventory from "components/Inventory";

export default function Character() {
  return (
    <Stack gap={3}>
      <Status />

      <Inventory />

      <AttributesSummary />
    </Stack>
  );
}

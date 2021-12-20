import Stack from "react-bootstrap/Stack";

import AttackButton from "components/Character/AttackButton";
import AttributesSummary from "components/Character/AttributesSummary";
import AttributesButton from "components/Character/AttributesButton";
import Status from "components/Character/Status";
import Inventory from "components/Inventory";
import InventoryButton from "components/Inventory/InventoryButton";

export default function Character() {
  return (
    <Stack gap={3}>
      <Status />

      <AttackButton />

      <Inventory />

      <InventoryButton />

      <AttributesSummary />

      <AttributesButton />
    </Stack>
  );
}

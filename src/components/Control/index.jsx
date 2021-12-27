import Stack from "react-bootstrap/Stack";

import AttackButton from "components/Control/AttackButton";
import AttributesButton from "components/Control/AttributesButton";
import CollectLootButton from "components/Control/CollectLootButton";
import InventoryButton from "components/Control/InventoryButton";
import TravelButton from "components/Control/TravelButton";

export default function Control() {
  return (
    <Stack gap={3}>
      <AttackButton />

      <CollectLootButton />

      <TravelButton />

      <AttributesButton />

      <InventoryButton />
    </Stack>
  );
}

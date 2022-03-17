import Stack from "react-bootstrap/Stack";

import AttackButton from "neverquest/components/Control/AttackButton";
import AttributesButton from "neverquest/components/Control/AttributesButton";
import CollectLootButton from "neverquest/components/Control/CollectLootButton";
import InventoryButton from "neverquest/components/Control/InventoryButton";
import TravelButton from "neverquest/components/Control/TravelButton";

export default function Control() {
  return (
    <Stack gap={4}>
      <AttackButton />

      <AttributesButton />

      <InventoryButton />

      <CollectLootButton />

      <TravelButton />
    </Stack>
  );
}

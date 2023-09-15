import { Stack } from "react-bootstrap";

import { AttackButton } from "@neverquest/components/Controls/AttackButton";
import { CapabilitiesButton } from "@neverquest/components/Controls/CapabilitiesButton";
import { CollectLootButton } from "@neverquest/components/Controls/CollectLootButton";
import { InventoryButton } from "@neverquest/components/Controls/InventoryButton";
import { RetireButton } from "@neverquest/components/Controls/RetireButton";
import { TravelButton } from "@neverquest/components/Controls/TravelButton";

export function Control() {
  return (
    <Stack gap={3}>
      <RetireButton />

      <AttackButton />

      <CapabilitiesButton />

      <InventoryButton />

      <CollectLootButton />

      <TravelButton />
    </Stack>
  );
}

import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import { AttackButton } from "@neverquest/components/Control/AttackButton";
import { AttributesButton } from "@neverquest/components/Control/AttributesButton";
import { CollectLootButton } from "@neverquest/components/Control/CollectLootButton";
import { InventoryButton } from "@neverquest/components/Control/InventoryButton";
import { RetireButton } from "@neverquest/components/Control/RetireButton";
import { TravelButton } from "@neverquest/components/Control/TravelButton";
import { isGameOver } from "@neverquest/state/settings";

export function Control() {
  const isGameOverValue = useRecoilValue(isGameOver);

  return (
    <Stack gap={3}>
      <RetireButton isDisabled={isGameOverValue} />

      <AttackButton isDisabled={isGameOverValue} />

      <AttributesButton isDisabled={isGameOverValue} />

      <InventoryButton isDisabled={isGameOverValue} />

      <CollectLootButton isDisabled={isGameOverValue} />

      <TravelButton isDisabled={isGameOverValue} />
    </Stack>
  );
}

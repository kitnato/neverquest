import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { AttackButton } from "@neverquest/components/Controls/AttackButton";
import { AttributesButton } from "@neverquest/components/Controls/AttributesButton";
import { CollectLootButton } from "@neverquest/components/Controls/CollectLootButton";
import { InventoryButton } from "@neverquest/components/Controls/InventoryButton";
import { RetireButton } from "@neverquest/components/Controls/RetireButton";
import { TravelButton } from "@neverquest/components/Controls/TravelButton";
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

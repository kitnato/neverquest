import { useAtomValue } from "jotai";
import Stack from "react-bootstrap/Stack";

import AttackButton from "neverquest/components/Control/AttackButton";
import AttributesButton from "neverquest/components/Control/AttributesButton";
import CollectLootButton from "neverquest/components/Control/CollectLootButton";
import InventoryButton from "neverquest/components/Control/InventoryButton";
import TravelButton from "neverquest/components/Control/TravelButton";
import { gameOver } from "neverquest/state/global";

export default function Control() {
  const isGameOver = useAtomValue(gameOver);

  return (
    <Stack gap={4}>
      <AttackButton isDisabled={isGameOver} />

      <AttributesButton isDisabled={isGameOver} />

      <InventoryButton isDisabled={isGameOver} />

      <CollectLootButton isDisabled={isGameOver} />

      <TravelButton isDisabled={isGameOver} />
    </Stack>
  );
}

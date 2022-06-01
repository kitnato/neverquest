import { useAtomValue } from "jotai";
import Stack from "react-bootstrap/Stack";

import FloatingText from "neverquest/components/FloatingText";
import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/level-four.svg";
import { characterLevel } from "neverquest/state/character";
import { deltaCharacterLevel } from "neverquest/state/deltas";

export default function CharacterLevel() {
  const characterLevelValue = useAtomValue(characterLevel);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Power level" />

      <span>{characterLevelValue}</span>

      <FloatingText atom={deltaCharacterLevel} />
    </Stack>
  );
}

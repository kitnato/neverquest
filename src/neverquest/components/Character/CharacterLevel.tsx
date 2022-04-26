import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import FloatingText from "neverquest/components/FloatingText";
import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/level-four.svg";
import { characterLevel } from "neverquest/state/character";
import { deltaCharacterLevel } from "neverquest/state/deltas";
import { showCharacterLevel } from "neverquest/state/show";

export default function CharacterLevel() {
  const characterLevelValue = useRecoilValue(characterLevel);
  const showCharacterLevelValue = useRecoilValue(showCharacterLevel);

  if (!showCharacterLevelValue) {
    return null;
  }

  return (
    <Stack
      className="animate__animated animate__flipInX"
      direction="horizontal"
      gap={3}
    >
      <ImageIcon icon={icon} tooltip="Level" />

      <span>{characterLevelValue}</span>

      <FloatingText atom={deltaCharacterLevel} />
    </Stack>
  );
}

import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/level-four.svg";
import { characterLevel } from "neverquest/state/character";
import { showCharacterLevel } from "neverquest/state/show";

export default function CharacterLevel() {
  const characterLevelValue = useRecoilValue(characterLevel);
  const showCharacterLevelValue = useRecoilValue(showCharacterLevel);

  if (!showCharacterLevelValue) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Level" />

      <span>{characterLevelValue}</span>
    </Stack>
  );
}

import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/level-four.svg";
import { characterLevel } from "neverquest/state/character";

export default function Level() {
  const characterLevelValue = useRecoilValue(characterLevel);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Level" />

      <span>{characterLevelValue}</span>
    </Stack>
  );
}

import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import ImageIcon from "@neverquest/components/ImageIcon";
import { ReactComponent as Icon } from "@neverquest/icons/level-four.svg";
import { characterLevel } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { DeltaType } from "@neverquest/types/enums";

export default function CharacterLevel() {
  const characterLevelValue = useRecoilValue(characterLevel);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon Icon={Icon} tooltip="Power level" />

      <span>{characterLevelValue}</span>

      <FloatingText atom={deltas(DeltaType.CharacterLevel)} />
    </Stack>
  );
}

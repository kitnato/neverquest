import Stack from "react-bootstrap/Stack";
import { useAtomValue } from "jotai";

import FloatingText from "neverquest/components/FloatingText";
import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/level-four.svg";
import { characterLevel } from "neverquest/state/character";
import { deltaCharacterLevel } from "neverquest/state/deltas";
import { showCharacterLevel } from "neverquest/state/show";
import { AnimationType } from "neverquest/types/ui";
import { getAnimationClass } from "neverquest/utilities/helpers";

export default function CharacterLevel() {
  const characterLevelValue = useAtomValue(characterLevel);
  const showCharacterLevelValue = useAtomValue(showCharacterLevel);

  if (!showCharacterLevelValue) {
    return null;
  }

  return (
    <Stack className={getAnimationClass(AnimationType.FlipInX)} direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Level" />

      <span>{characterLevelValue}</span>

      <FloatingText atom={deltaCharacterLevel} />
    </Stack>
  );
}

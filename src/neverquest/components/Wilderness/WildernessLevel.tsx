import { useAtomValue } from "jotai";
import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import FloatingText from "neverquest/components/FloatingText";
import icon from "neverquest/icons/flying-flag.svg";
import useDeltaText from "neverquest/hooks/useDeltaText";
import { level } from "neverquest/state/encounter";
import { deltaWildernessLevel } from "neverquest/state/deltas";
import { OverlayPlacement } from "neverquest/types/ui";

export default function WildernessLevel() {
  const levelValue = useAtomValue(level);

  useDeltaText({
    deltaAtom: deltaWildernessLevel,
    valueAtom: level,
  });

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} placement={OverlayPlacement.Bottom} tooltip="Level" />

      <span>{levelValue}</span>

      <FloatingText atom={deltaWildernessLevel} />
    </Stack>
  );
}

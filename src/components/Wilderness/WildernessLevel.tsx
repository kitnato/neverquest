import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "@neverquest/components/ImageIcon";
import FloatingText from "@neverquest/components/FloatingText";
import { ReactComponent as Icon } from "@neverquest/icons/flying-flag.svg";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { level } from "@neverquest/state/encounter";
import { deltas } from "@neverquest/state/deltas";
import { OverlayPlacement } from "@neverquest/types/ui";
import { DeltaType } from "@neverquest/types/enums";

export default function () {
  const levelValue = useRecoilValue(level);

  const deltaWildernessLevel = deltas(DeltaType.WildernessLevel);

  useDeltaText({
    deltaAtom: deltaWildernessLevel,
    valueAtom: level,
  });

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon Icon={Icon} placement={OverlayPlacement.Bottom} tooltip="Level" />

      <span>{levelValue}</span>

      <FloatingText atom={deltaWildernessLevel} />
    </Stack>
  );
}

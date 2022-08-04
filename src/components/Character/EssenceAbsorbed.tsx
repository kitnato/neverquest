import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import ImageIcon from "@neverquest/components/ImageIcon";
import { ReactComponent as Icon } from "@neverquest/icons/abstract-013.svg";
import { essenceAbsorbed } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { DeltaType } from "@neverquest/types/enums";

export default function EssenceAbsorbed() {
  const essenceAbsorbedValue = useRecoilValue(essenceAbsorbed);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon Icon={Icon} tooltip="Absorbed essence" />

      <span>{essenceAbsorbedValue}</span>

      <FloatingText atom={deltas(DeltaType.EssenceAbsorbed)} />
    </Stack>
  );
}

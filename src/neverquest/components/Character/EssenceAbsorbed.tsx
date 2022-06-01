import { useAtomValue } from "jotai";
import Stack from "react-bootstrap/Stack";

import FloatingText from "neverquest/components/FloatingText";
import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/abstract-013.svg";
import { essenceAbsorbed } from "neverquest/state/character";
import { deltaEssenceAbsorbed } from "neverquest/state/deltas";

export default function EssenceAbsorbed() {
  const essenceAbsorbedValue = useAtomValue(essenceAbsorbed);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Absorbed essence" />

      <span>{essenceAbsorbedValue}</span>

      <FloatingText atom={deltaEssenceAbsorbed} />
    </Stack>
  );
}

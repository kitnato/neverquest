import Stack from "react-bootstrap/Stack";

import ImageIcon from "neverquest/components/ImageIcon";
import AttackMeter from "neverquest/components/Character/AttackMeter";
import icon from "neverquest/icons/striking-splinter.svg";

export default function Attack() {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Attack rate" />

      <AttackMeter />
    </Stack>
  );
}

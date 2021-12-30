import Stack from "react-bootstrap/Stack";

import ImageIcon from "components/ImageIcon";
import AttackMeter from "components/Character/AttackMeter";
import icon from "icons/striking-splinter.svg";

export default function Attack() {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Attack rate" />

      <AttackMeter />
    </Stack>
  );
}

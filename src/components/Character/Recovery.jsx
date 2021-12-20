import Stack from "react-bootstrap/Stack";

import ImageIcon from "components/ImageIcon";
import RecoveryMeter from "components/Character/RecoveryMeter";
import icon from "icons/knockout.svg";

export default function Recovery() {
  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Recovery rate" />

      <RecoveryMeter />
    </Stack>
  );
}

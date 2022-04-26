import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import RecoveryMeter from "neverquest/components/Character/RecoveryMeter";
import icon from "neverquest/icons/knockout.svg";
import { showRecovery } from "neverquest/state/show";

export default function Recovery() {
  const showRecoveryValue = useRecoilValue(showRecovery);

  if (!showRecoveryValue) {
    return null;
  }

  return (
    <Stack
      className="animate__animated animate__flipInX"
      direction="horizontal"
      gap={3}
    >
      <ImageIcon icon={icon} tooltip="Recovery rate" />

      <RecoveryMeter />
    </Stack>
  );
}

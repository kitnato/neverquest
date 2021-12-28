import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import RecoveryMeter from "components/Character/RecoveryMeter";
import icon from "icons/knockout.svg";
import { show } from "state/global";

export default function Recovery() {
  const showValue = useRecoilValue(show);

  if (!showValue.recovery) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Recovery rate" />

      <RecoveryMeter />
    </Stack>
  );
}

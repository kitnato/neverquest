import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import RecoveryMeter from "neverquest/components/Character/RecoveryMeter";
import icon from "neverquest/icons/knockout.svg";
import { show } from "neverquest/state/global";

export default function Recovery() {
  const { recovery } = useRecoilValue(show);

  if (!recovery) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Recovery rate" />

      <RecoveryMeter />
    </Stack>
  );
}

import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import FloatingText from "neverquest/components/FloatingText";
import ImageIcon from "neverquest/components/ImageIcon";
import RecoveryMeter from "neverquest/components/Character/RecoveryMeter";
import useDeltaText from "neverquest/hooks/useDeltaText";
import icon from "neverquest/icons/knockout.svg";
import { deltaTotalRecoveryRate } from "neverquest/state/deltas";
import { showRecovery } from "neverquest/state/show";
import { totalRecoveryRate } from "neverquest/state/stats";

export default function Recovery() {
  const showRecoveryValue = useRecoilValue(showRecovery);

  useDeltaText({
    deltaAtom: deltaTotalRecoveryRate,
    isTime: true,
    valueAtom: totalRecoveryRate,
  });

  if (!showRecoveryValue) {
    return null;
  }

  return (
    <Stack className="animate__animated animate__flipInX" direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Recovery rate" />

      <RecoveryMeter />

      <FloatingText atom={deltaTotalRecoveryRate} />
    </Stack>
  );
}

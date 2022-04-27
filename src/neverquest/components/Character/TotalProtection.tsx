import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import FloatingText from "neverquest/components/FloatingText";
import ImageIcon from "neverquest/components/ImageIcon";
import useDeltaText from "neverquest/hooks/useDeltaText";
import icon from "neverquest/icons/barbute.svg";
import { deltaTotalProtection } from "neverquest/state/deltas";
import { showTotalProtection } from "neverquest/state/show";
import { totalProtection } from "neverquest/state/stats";

export default function TotalProtection() {
  const showTotalProtectionValue = useRecoilValue(showTotalProtection);
  const totalProtectionValue = useRecoilValue(totalProtection);

  useDeltaText({
    deltaAtom: deltaTotalProtection,
    valueAtom: totalProtection,
  });

  if (!showTotalProtectionValue) {
    return null;
  }

  return (
    <Stack className="animate__animated animate__flipInX" direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Total protection" />

      <span>{totalProtectionValue}</span>

      <FloatingText atom={deltaTotalProtection} />
    </Stack>
  );
}

import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/barbute.svg";
import { showTotalProtection } from "neverquest/state/show";
import { totalProtection } from "neverquest/state/stats";

export default function TotalProtection() {
  const showTotalProtectionValue = useRecoilValue(showTotalProtection);
  const totalProtectionValue = useRecoilValue(totalProtection);

  if (!showTotalProtectionValue) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Total protection" />

      <span>{totalProtectionValue}</span>
    </Stack>
  );
}

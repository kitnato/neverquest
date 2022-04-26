import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/striking-splinter.svg";
import { showCritical } from "neverquest/state/show";
import { totalCriticalDamage } from "neverquest/state/stats";

export default function CritDamage() {
  const criticalDamageValue = useRecoilValue(totalCriticalDamage);
  const showCriticalValue = useRecoilValue(showCritical);

  if (!showCriticalValue) {
    return null;
  }

  return (
    <Stack
      className="animate__animated animate__flipInX"
      direction="horizontal"
      gap={3}
    >
      <ImageIcon icon={icon} tooltip="Critical damage bonus" />

      <span>{criticalDamageValue * 100}%</span>
    </Stack>
  );
}

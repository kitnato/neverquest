import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/striking-splinter.svg";
import { show } from "state/global";
import { totalCriticalDamage } from "state/stats";

export default function CritDamage() {
  const criticalDamageValue = useRecoilValue(totalCriticalDamage);
  const { critical } = useRecoilValue(show);

  if (!critical) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Critical damage bonus" />

      <span>{criticalDamageValue * 100}%</span>
    </Stack>
  );
}

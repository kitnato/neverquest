import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/heavy-timer.svg";
import { show } from "neverquest/state/global";
import { damagePerSecond } from "neverquest/state/stats";

export default function DamagePerSecond() {
  const damagePerSecondValue = useRecoilValue(damagePerSecond);
  const showValue = useRecoilValue(show);

  if (!showValue.damagePerSecond) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Damage per second (DPS)" />

      <span>{damagePerSecondValue}</span>
    </Stack>
  );
}

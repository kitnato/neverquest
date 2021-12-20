import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/fist.svg";
import { damagePerSecond } from "state/character";

export default function DamagePerSecond() {
  const dpsValue = useRecoilValue(damagePerSecond);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Damage per second (DPS)" />

      <span>{dpsValue}</span>
    </Stack>
  );
}

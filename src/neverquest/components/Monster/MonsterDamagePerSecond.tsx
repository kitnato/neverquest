import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/wolverine-claws.svg";
import { show } from "neverquest/state/global";
import { damagePerSecondMonster } from "neverquest/state/monster";

export default function MonsterDamagePerSecond() {
  const damagePerSecondValue = useRecoilValue(damagePerSecondMonster);
  const showValue = useRecoilValue(show);

  if (!showValue.damagePerSecond) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Monster damage per second (DPS)" />

      <span>{damagePerSecondValue}</span>
    </Stack>
  );
}

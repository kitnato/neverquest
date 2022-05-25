import Stack from "react-bootstrap/Stack";
import { useAtomValue } from "jotai";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/wolverine-claws.svg";
import { totalDamageMonster } from "neverquest/state/monster";

export default function MonsterDamage() {
  const totalDamageMonsterValue = useAtomValue(totalDamageMonster);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Monster damage" />

      <span>{totalDamageMonsterValue}</span>
    </Stack>
  );
}

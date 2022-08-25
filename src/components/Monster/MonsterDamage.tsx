import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "@neverquest/components/ImageIcon";
import { ReactComponent as Icon } from "@neverquest/icons/wolverine-claws.svg";
import { totalDamageMonster } from "@neverquest/state/monster";

export default function () {
  const totalDamageMonsterValue = useRecoilValue(totalDamageMonster);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon Icon={Icon} tooltip="Monster damage" />

      <span>{totalDamageMonsterValue}</span>
    </Stack>
  );
}

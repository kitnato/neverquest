import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Stack from "react-bootstrap/Stack";
import Tooltip from "react-bootstrap/Tooltip";
import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/wolverine-claws.svg";
import { totalAttackRateMonster, totalDamageMonster } from "state/monster";

export default function MonsterDamage() {
  const { max, min } = useRecoilValue(totalDamageMonster);
  const totalAttackRateMonsterValue = useRecoilValue(totalAttackRateMonster);

  const damagePerSecond = (
    (max + min) /
    2 /
    (totalAttackRateMonsterValue / 1000)
  ).toFixed(2);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Monster damage" />

      <div>
        <span>{`${min}-${max}`}</span>

        <OverlayTrigger
          overlay={<Tooltip>Damage per second (DPS)</Tooltip>}
          placement="top"
        >
          <span>{` (${damagePerSecond})`}</span>
        </OverlayTrigger>
      </div>
    </Stack>
  );
}

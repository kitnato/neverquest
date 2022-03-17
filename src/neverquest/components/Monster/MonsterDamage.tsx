import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Stack from "react-bootstrap/Stack";
import Tooltip from "react-bootstrap/Tooltip";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/wolverine-claws.svg";
import { damagePerSecondMonster, totalDamageMonster } from "neverquest/state/monster";

export default function MonsterDamage() {
  const damagePerSecondValue = useRecoilValue(damagePerSecondMonster);
  const { maximum, minimum } = useRecoilValue(totalDamageMonster);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Monster damage" />

      <div>
        <span>{`${minimum}-${maximum}`}</span>

        <OverlayTrigger overlay={<Tooltip>Damage per second (DPS)</Tooltip>} placement="top">
          <span>{` (${damagePerSecondValue})`}</span>
        </OverlayTrigger>
      </div>
    </Stack>
  );
}

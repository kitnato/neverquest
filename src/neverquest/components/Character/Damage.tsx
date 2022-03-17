import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Stack from "react-bootstrap/Stack";
import Tooltip from "react-bootstrap/Tooltip";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/wolverine-claws.svg";
import { damagePerSecond } from "neverquest/state/character";
import { totalDamage } from "neverquest/state/stats";

export default function Damage() {
  const damagePerSecondValue = useRecoilValue(damagePerSecond);
  const { minimum, maximum } = useRecoilValue(totalDamage);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Total damage" />

      <div>
        <span>{`${minimum}-${maximum}`}</span>

        <OverlayTrigger overlay={<Tooltip>Damage per second (DPS)</Tooltip>} placement="top">
          <span>{` (${damagePerSecondValue})`}</span>
        </OverlayTrigger>
      </div>
    </Stack>
  );
}

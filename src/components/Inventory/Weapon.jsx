import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/axe-sword.svg";
import { weapon } from "state/equipment";
import { show } from "state/global";

export default function Weapon() {
  const weaponValue = useRecoilValue(weapon);
  const showValue = useRecoilValue(show);

  if (!showValue.weapon) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Weapon" />

      <OverlayTrigger
        overlay={
          <Tooltip>
            {`Damage: ${weaponValue.damage.min}-${weaponValue.damage.max}`}
            <br />
            {`Type: ${weaponValue.type}`}
          </Tooltip>
        }
        placement="top"
      >
        <span>{weaponValue.name}</span>
      </OverlayTrigger>
    </Stack>
  );
}

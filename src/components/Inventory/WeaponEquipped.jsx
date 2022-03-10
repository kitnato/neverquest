import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/axe-sword.svg";
import { weapon } from "state/equipment";
import { show } from "state/global";
import { getDamagePerSecond } from "utilities/helpers";

export default function WeaponEquipped() {
  const { cost, damage, name, rate, type } = useRecoilValue(weapon);
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
            {`Damage: ${damage.min}-${damage.max} (${getDamagePerSecond({
              range: damage,
              rate,
            })} DPS)`}
            <br />
            {`Stamina cost: ${cost}`}
            <br />
            {`Type: ${type}`}
          </Tooltip>
        }
        placement="top"
      >
        <span>{name}</span>
      </OverlayTrigger>
    </Stack>
  );
}

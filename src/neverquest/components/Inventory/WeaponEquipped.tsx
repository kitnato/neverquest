import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Stack from "react-bootstrap/Stack";
import { useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/axe-sword.svg";
import { weapon } from "neverquest/state/equipment";
import { show } from "neverquest/state/global";
import { capitalizeAll, getDamagePerSecond } from "neverquest/utilities/helpers";

export default function WeaponEquipped() {
  const showValue = useRecoilValue(show);
  const { damage, name, rate, staminaCost, type, weight } = useRecoilValue(weapon);

  if (!showValue.weapon) {
    return null;
  }

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Weapon" />

      <OverlayTrigger
        overlay={
          <Tooltip>
            {`Damage: ${damage.minimum}-${damage.maximum} (${getDamagePerSecond({
              range: damage,
              rate,
            })} DPS)`}
            <br />
            {`Stamina cost: ${staminaCost}`}
            <br />
            {`Type: ${capitalizeAll(type)}`}
            <br />
            {`Weight: ${capitalizeAll(weight)}`}
          </Tooltip>
        }
        placement="top"
      >
        <span>{name}</span>
      </OverlayTrigger>
    </Stack>
  );
}

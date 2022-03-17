import { useEffect } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Stack from "react-bootstrap/Stack";
import { useRecoilState, useRecoilValue } from "recoil";

import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/axe-sword.svg";
import { weapon } from "neverquest/state/equipment";
import { show } from "neverquest/state/global";
import { NO_WEAPON } from "neverquest/utilities/constants";
import { getDamagePerSecond } from "neverquest/utilities/helpers";

export default function WeaponEquipped() {
  const [showValue, setShow] = useRecoilState(show);
  const { damage, name, rate, staminaCost, type } = useRecoilValue(weapon);

  useEffect(() => {
    if (name !== NO_WEAPON.name && !showValue.weapon) {
      setShow({ ...showValue, weapon: true });
    }
  }, [name, setShow, showValue]);

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

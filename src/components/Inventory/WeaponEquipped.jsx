import { useEffect } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Stack from "react-bootstrap/Stack";
import { useRecoilState, useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/axe-sword.svg";
import { weapon } from "state/equipment";
import { show } from "state/global";
import { NO_WEAPON } from "utilities/constants";
import { getDamagePerSecond } from "utilities/helpers";

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
            {`Damage: ${damage.minimum}-${damage.maximum} (${getDamagePerSecond(
              {
                range: damage,
                rate,
              }
            )} DPS)`}
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

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useRecoilValue } from "recoil";

import ImageIcon from "components/ImageIcon";
import icon from "icons/axe-sword.svg";
import { weapon } from "state/equipment";

export default function Weapon() {
  const weaponValue = useRecoilValue(weapon);

  return (
    <div className="align-items-center d-flex spaced-horizontal">
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
    </div>
  );
}

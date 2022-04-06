import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import { Weapon } from "neverquest/env.d";
import { capitalizeAll, getDamagePerSecond } from "neverquest/utilities/helpers";

export default function WeaponName({ weapon }: { weapon: Weapon }) {
  const { damage, name, rate, staminaCost, type, weight } = weapon;

  return (
    <OverlayTrigger
      overlay={
        <Tooltip>
          {`Damage: ${damage} (${getDamagePerSecond({
            damage,
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
  );
}

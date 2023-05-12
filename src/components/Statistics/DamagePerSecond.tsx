import { OverlayTrigger, Tooltip } from "react-bootstrap";

import { ReactComponent as IconDamagePerSecond } from "@neverquest/icons/damage-per-second.svg";

export function DamagePerSecond({ damagePerSecond }: { damagePerSecond: string }) {
  return (
    <>
      <OverlayTrigger overlay={<Tooltip>Damage per second</Tooltip>} placement="bottom">
        <span>
          <IconDamagePerSecond className="inlay" />
        </span>
      </OverlayTrigger>
      &nbsp;{damagePerSecond}
    </>
  );
}

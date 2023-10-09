import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { useToggleLocation } from "@neverquest/hooks/actions/useToggleLocation";
import { isAttacking } from "@neverquest/state/character";
import { isWilderness } from "@neverquest/state/encounter";
import { isInventoryOpen } from "@neverquest/state/inventory";

export function HearthstoneWarp() {
  const isAttackingValue = useRecoilValue(isAttacking);
  const resetIsInventoryOpen = useResetRecoilState(isInventoryOpen);
  const isWildernessValue = useRecoilValue(isWilderness);

  const toggleLocation = useToggleLocation();

  const canWarp = !isAttackingValue && isWildernessValue;

  return (
    <OverlayTrigger
      overlay={<Tooltip>The hearthstone is cold.</Tooltip>}
      trigger={canWarp ? [] : ["focus", "hover"]}
    >
      <span>
        <Button
          disabled={!canWarp}
          onClick={() => {
            resetIsInventoryOpen();
            toggleLocation();
          }}
          variant="outline-dark"
        >
          Warp
        </Button>
      </span>
    </OverlayTrigger>
  );
}

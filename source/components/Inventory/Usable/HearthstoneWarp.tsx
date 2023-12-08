import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { useProgressQuest } from "@neverquest/hooks/actions/useProgressQuest";
import { useToggleLocation } from "@neverquest/hooks/actions/useToggleLocation";
import { isAttacking } from "@neverquest/state/character";
import { location } from "@neverquest/state/encounter";
import { isInventoryOpen } from "@neverquest/state/inventory";

export function HearthstoneWarp() {
  const isAttackingValue = useRecoilValue(isAttacking);
  const resetIsInventoryOpen = useResetRecoilState(isInventoryOpen);
  const locationValue = useRecoilValue(location);

  const progressQuest = useProgressQuest();
  const toggleLocation = useToggleLocation();

  const canWarp = !isAttackingValue && locationValue === "wilderness";

  return (
    <OverlayTrigger
      overlay={<Tooltip>The hearthstone is cold.</Tooltip>}
      trigger={canWarp ? [] : ["focus", "hover"]}
    >
      <span>
        <Button
          disabled={!canWarp}
          onClick={() => {
            progressQuest({ quest: "warpingCaravan" });
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

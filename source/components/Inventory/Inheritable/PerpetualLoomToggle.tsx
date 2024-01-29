import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { POPOVER_TRIGGER } from "@neverquest/data/general";
import { location } from "@neverquest/state/encounter";
import { isWeaving } from "@neverquest/state/items";

export function PerpetualLoomToggle() {
  const [isWeavingValue, setIsWeaving] = useRecoilState(isWeaving);
  const locationValue = useRecoilValue(location);

  const canActivate = locationValue === "wilderness";

  return (
    <OverlayTrigger
      overlay={
        <Tooltip>
          <span>The pedal requires wild ground.</span>
        </Tooltip>
      }
      trigger={canActivate ? [] : POPOVER_TRIGGER}
    >
      <div>
        <Button
          disabled={!canActivate}
          onClick={() => {
            setIsWeaving((isActive) => !isActive);
          }}
          variant="outline-dark"
        >
          {isWeavingValue ? "Unravel" : "Weave"}
        </Button>
      </div>
    </OverlayTrigger>
  );
}

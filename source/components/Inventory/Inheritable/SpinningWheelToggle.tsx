import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { POPOVER_TRIGGER } from "@neverquest/data/general";
import { location } from "@neverquest/state/encounter";
import { isSpinning } from "@neverquest/state/items";

export function SpinningWheelToggle() {
  const [isSpinningValue, setIsSpinning] = useRecoilState(isSpinning);
  const locationValue = useRecoilValue(location);

  const canActivate = locationValue === "wilderness";

  return (
    <OverlayTrigger
      overlay={<Tooltip>The pedal requires wild ground.</Tooltip>}
      trigger={canActivate ? [] : POPOVER_TRIGGER}
    >
      <div>
        <Button
          disabled={!canActivate}
          onClick={() => {
            setIsSpinning((isActive) => !isActive);
          }}
          variant="outline-dark"
        >
          {isSpinningValue ? "Stop" : "Start"}
        </Button>
      </div>
    </OverlayTrigger>
  );
}

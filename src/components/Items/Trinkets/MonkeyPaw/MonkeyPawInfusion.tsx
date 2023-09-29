import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { useMonkeyPawInfuse } from "@neverquest/hooks/actions/useMonkeyPawInfuse";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { canAffordInfusion, infusionDelta } from "@neverquest/state/items";
import { LABEL_NO_ESSENCE } from "@neverquest/utilities/constants";

export function MonkeyPawInfusion() {
  const canAffordInfusionValue = useRecoilValue(canAffordInfusion);
  const setInfusionDelta = useSetRecoilState(infusionDelta);
  const resetInfusionDelta = useResetRecoilState(infusionDelta);

  const [isInfusing, setIsInfusing] = useState(false);

  const monkeyPawInfuse = useMonkeyPawInfuse();

  const handleStop = () => {
    setIsInfusing(false);
    resetInfusionDelta();
  };

  useAnimate({
    delta: setInfusionDelta,
    onDelta: () => {
      monkeyPawInfuse();

      resetInfusionDelta();
    },
    stop: !isInfusing,
  });

  return (
    <OverlayTrigger
      overlay={<Tooltip>{LABEL_NO_ESSENCE}</Tooltip>}
      trigger={canAffordInfusionValue ? [] : ["focus", "hover"]}
    >
      <span>
        <Button
          disabled={!canAffordInfusionValue}
          onMouseDown={() => setIsInfusing(true)}
          onMouseOut={handleStop}
          onMouseUp={handleStop}
          variant="outline-dark"
        >
          Infuse
        </Button>
      </span>
    </OverlayTrigger>
  );
}

import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { useInfuse } from "@neverquest/hooks/actions/useInfuse";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { infusionDelta, infusionStep } from "@neverquest/state/items";
import type { Infusable } from "@neverquest/types/unions";
import { LABEL_NO_ESSENCE } from "@neverquest/utilities/constants";

export function Infusion({ infusable }: { infusable: Infusable }) {
  const canInfuse = useRecoilValue(infusionStep(infusable)) > 0;
  const setInfusionDelta = useSetRecoilState(infusionDelta);
  const resetInfusionDelta = useResetRecoilState(infusionDelta);

  const [isInfusing, setIsInfusing] = useState(false);

  const infuse = useInfuse();

  const handleStop = () => {
    setIsInfusing(false);
    resetInfusionDelta();
  };

  useAnimate({
    delta: setInfusionDelta,
    onDelta: () => {
      infuse(infusable);

      resetInfusionDelta();
    },
    stop: !isInfusing,
  });

  return (
    <OverlayTrigger
      overlay={<Tooltip>{LABEL_NO_ESSENCE}</Tooltip>}
      trigger={canInfuse ? [] : ["focus", "hover"]}
    >
      <span>
        <Button
          disabled={!canInfuse}
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

import { useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

import { LABEL_NO_ESSENCE, LEVEL_MAXIMUM } from "@neverquest/data/general";
import { useInfuse } from "@neverquest/hooks/actions/useInfuse";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { infusionDelta, infusionLevel, infusionStep } from "@neverquest/state/items";
import type { Infusable } from "@neverquest/types/unions";

export function Infusion({ infusable }: { infusable: Infusable }) {
  const infusionStepValue = useRecoilValue(infusionStep(infusable));
  const setInfusionDelta = useSetRecoilState(infusionDelta);
  const resetInfusionDelta = useResetRecoilState(infusionDelta);
  const isInfusionAtMaximum = useRecoilValue(infusionLevel(infusable)) >= LEVEL_MAXIMUM;

  const [isInfusing, setIsInfusing] = useState(false);

  const infuse = useInfuse();

  const isInfusionPossible = infusionStepValue > 0;
  const canInfuse = isInfusionPossible && !isInfusionAtMaximum;

  const onStop = () => {
    setIsInfusing(false);
    resetInfusionDelta();
  };

  useAnimate({
    delta: setInfusionDelta,
    onDelta: () => {
      infuse(infusable);

      resetInfusionDelta();
    },
    stop: !isInfusing || isInfusionAtMaximum,
  });

  return (
    <OverlayTrigger
      overlay={
        <Tooltip>
          {!isInfusionPossible && <div>{LABEL_NO_ESSENCE}</div>}

          {isInfusionAtMaximum && <div>Infusion limit reached.</div>}
        </Tooltip>
      }
      trigger={canInfuse ? [] : ["focus", "hover"]}
    >
      <span>
        <Button
          disabled={!canInfuse}
          onMouseDown={() => setIsInfusing(true)}
          onMouseOut={onStop}
          onMouseUp={onStop}
          variant="outline-dark"
        >
          Infuse
        </Button>
      </span>
    </OverlayTrigger>
  );
}

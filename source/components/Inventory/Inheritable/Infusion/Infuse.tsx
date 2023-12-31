import { useEffect, useState } from "react";
import { Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Hatch } from "@neverquest/components/Inventory/Inheritable/Infusion/Hatch";
import { INFUSION_DELTA, LABEL_NO_ESSENCE, LEVELLING_MAXIMUM } from "@neverquest/data/general";
import { useInfuse } from "@neverquest/hooks/actions/useInfuse";
import { useAnimation } from "@neverquest/hooks/useAnimation";
import { infusionLevel, infusionStep } from "@neverquest/state/items";
import type { Infusable } from "@neverquest/types/unions";

export function Infuse({ infusable }: { infusable: Infusable }) {
  const infusionLevelValue = useRecoilValue(infusionLevel(infusable));
  const infusionStepValue = useRecoilValue(infusionStep(infusable));

  const [isInfusing, setIsInfusing] = useState(false);
  const [infusionDelta, setInfusionDelta] = useState(0);

  const infuse = useInfuse();

  const isInfusionAtMaximum = infusionLevelValue >= LEVELLING_MAXIMUM;
  const isInfusionPossible = infusionStepValue > 0;
  const canInfuse = isInfusionPossible && !isInfusionAtMaximum;

  const onStop = () => {
    setIsInfusing(false);
  };

  useAnimation({
    onFrame: (elapsed) => {
      if (infusionDelta >= INFUSION_DELTA) {
        infuse(infusable);

        setInfusionDelta(0);
      } else {
        setInfusionDelta(infusionDelta + elapsed);
      }
    },
    stop: !isInfusing,
  });

  useEffect(() => {
    if (!isInfusing || isInfusionAtMaximum || !isInfusionPossible) {
      setIsInfusing(false);
      setInfusionDelta(0);
    }
  }, [isInfusing, isInfusionAtMaximum, isInfusionPossible]);

  return isInfusionAtMaximum && infusable === "mysterious egg" ? (
    <Hatch />
  ) : (
    <OverlayTrigger
      overlay={
        <Tooltip>
          {!isInfusionPossible && <div>{LABEL_NO_ESSENCE}</div>}

          {isInfusionAtMaximum && <div>Infusion limit reached.</div>}
        </Tooltip>
      }
      trigger={canInfuse ? [] : ["focus", "hover"]}
    >
      <div>
        <Button
          disabled={!canInfuse}
          onMouseDown={() => {
            setIsInfusing(true);
          }}
          onMouseOut={onStop}
          onMouseUp={onStop}
          variant="outline-dark"
        >
          Infuse
        </Button>
      </div>
    </OverlayTrigger>
  );
}

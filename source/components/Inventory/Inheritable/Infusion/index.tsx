import { useEffect, useState } from "react";
import { Button, OverlayTrigger, Stack, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { Hatch } from "@neverquest/components/Inventory/Inheritable/Infusion/Hatch";
import { LABEL_NO_ESSENCE, POPOVER_TRIGGER } from "@neverquest/data/general";
import { INFUSION_DELTA } from "@neverquest/data/items";
import { useInfuse } from "@neverquest/hooks/actions/useInfuse";
import { useAnimation } from "@neverquest/hooks/useAnimation";
import { infusionStep, isInfusionAtMaximum } from "@neverquest/state/items";
import type { Infusable } from "@neverquest/types/unions";

export function Infusion({ infusable }: { infusable: Infusable }) {
  const isInfusionAtMaximumValue = useRecoilValue(isInfusionAtMaximum(infusable));
  const infusionStepValue = useRecoilValue(infusionStep(infusable));

  const [isInfusing, setIsInfusing] = useState(false);
  const [infusionDelta, setInfusionDelta] = useState(0);

  const infuse = useInfuse();

  const isInfusionPossible = infusionStepValue > 0;
  const canInfuse = isInfusionPossible && !isInfusionAtMaximumValue;

  const onStop = () => {
    setIsInfusing(false);
    setInfusionDelta(0);
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
    if (!isInfusing || isInfusionAtMaximumValue || !isInfusionPossible) {
      onStop();
    }
  }, [isInfusing, isInfusionAtMaximumValue, isInfusionPossible]);

  return isInfusionAtMaximumValue && infusable === "mysterious egg" ? (
    <Hatch />
  ) : (
    <OverlayTrigger
      overlay={
        <Tooltip>
          <Stack>
            {!isInfusionPossible && <span>{LABEL_NO_ESSENCE}</span>}

            {isInfusionAtMaximumValue && <span>Infusion limit reached.</span>}
          </Stack>
        </Tooltip>
      }
      trigger={canInfuse ? [] : POPOVER_TRIGGER}
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
          <span>Infuse</span>
        </Button>
      </div>
    </OverlayTrigger>
  );
}

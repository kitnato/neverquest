import { OverlayTrigger, ProgressBar, Tooltip } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { poisonDuration } from "@neverquest/state/character";
import { health, healthMaximum, healthMaximumTotal } from "@neverquest/state/reserves";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function HealthMeter() {
  const healthValue = useRecoilValue(health);
  const healthMaximumValue = useRecoilValue(healthMaximum);
  const healthMaximumTotalValue = useRecoilValue(healthMaximumTotal);
  const poisonDurationValue = useRecoilValue(poisonDuration);

  const penalty = healthMaximumValue - healthMaximumTotalValue;

  return (
    <LabelledProgressBar
      attached="below"
      label={`${healthValue}/${healthMaximumTotalValue}${
        penalty > 0 ? ` (${healthMaximumValue})` : ""
      }`}
      sibling={
        penalty > 0 ? (
          <OverlayTrigger
            overlay={<Tooltip>{`Poison: ${formatMilliseconds(poisonDurationValue)}`}</Tooltip>}
            placement="top"
          >
            <ProgressBar key={2} now={penalty} striped variant="dark" />
          </OverlayTrigger>
        ) : null
      }
      value={(healthValue / healthMaximumTotalValue) * 100}
      variant="dark"
    />
  );
}

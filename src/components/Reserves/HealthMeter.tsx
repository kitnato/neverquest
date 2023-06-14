import { ProgressBar } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useAnimation } from "@neverquest/hooks/useAnimation";
import { poisonDuration } from "@neverquest/state/character";
import { health, healthMaximum, healthMaximumTotal } from "@neverquest/state/reserves";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function HealthMeter() {
  const [poisonDurationValue, setPoisonDuration] = useRecoilState(poisonDuration);
  const healthValue = useRecoilValue(health);
  const healthMaximumValue = useRecoilValue(healthMaximum);
  const healthMaximumTotalValue = useRecoilValue(healthMaximumTotal);

  const penalty = healthMaximumValue - healthMaximumTotalValue;
  const isPoisoned = penalty > 0 && poisonDurationValue > 0;

  useAnimation((delta) => {
    setPoisonDuration((current) => {
      const value = current - delta;

      if (value < 0) {
        return 0;
      }

      return value;
    });
  }, !isPoisoned);

  return (
    <LabelledProgressBar
      attached="below"
      label={`${healthValue}/${healthMaximumTotalValue}${
        penalty > 0
          ? ` (${healthMaximumValue}) Poison: ${formatMilliseconds(poisonDurationValue)}`
          : ""
      }`}
      sibling={penalty > 0 ? <ProgressBar animated key={2} now={penalty} striped /> : null}
      value={(healthValue / healthMaximumTotalValue) * (100 - penalty)}
      variant="dark"
    />
  );
}

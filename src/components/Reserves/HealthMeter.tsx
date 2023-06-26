import { useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useAnimation } from "@neverquest/hooks/useAnimation";
import {
  health,
  healthMaximum,
  healthMaximumTotal,
  poisonDuration,
} from "@neverquest/state/reserves";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function HealthMeter() {
  const [poisonDurationValue, setPoisonDuration] = useRecoilState(poisonDuration);
  const healthValue = useRecoilValue(health);
  const healthMaximumValue = useRecoilValue(healthMaximum);
  const healthMaximumTotalValue = useRecoilValue(healthMaximumTotal);
  const resetHealth = useResetRecoilState(health);

  const penalty = healthMaximumValue - healthMaximumTotalValue;
  const isPoisoned = poisonDurationValue > 0;

  useAnimation((delta) => {
    setPoisonDuration((current) => {
      const value = current - delta;

      if (value < 0) {
        return 0;
      }

      return value;
    });
  }, !isPoisoned);

  useEffect(() => {
    if (healthValue > healthMaximumTotalValue) {
      resetHealth();
    }
  }, [healthMaximumTotalValue, healthValue, resetHealth]);

  return (
    <LabelledProgressBar
      attached="below"
      label={`${healthValue}/${healthMaximumTotalValue}${
        isPoisoned
          ? ` (${healthMaximumValue}) Poison: ${formatMilliseconds(poisonDurationValue)}`
          : ""
      }`}
      sibling={
        isPoisoned ? (
          <ProgressBar animated key={2} now={penalty} striped variant="secondary" />
        ) : null
      }
      value={(healthValue / healthMaximumTotalValue) * (100 - penalty)}
      variant="dark"
    />
  );
}

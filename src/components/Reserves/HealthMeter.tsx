import { useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useAnimation } from "@neverquest/hooks/useAnimation";
import {
  health,
  healthMaximum,
  healthMaximumTotal,
  isPoisoned,
  poisonDuration,
} from "@neverquest/state/reserves";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function HealthMeter() {
  const [poisonDurationValue, setPoisonDuration] = useRecoilState(poisonDuration);
  const healthValue = useRecoilValue(health);
  const healthMaximumValue = useRecoilValue(healthMaximum);
  const healthMaximumTotalValue = useRecoilValue(healthMaximumTotal);
  const isPoisonedValue = useRecoilValue(isPoisoned);
  const resetHealth = useResetRecoilState(health);

  const penalty = healthMaximumValue - healthMaximumTotalValue;

  useAnimation((delta) => {
    setPoisonDuration((current) => {
      const value = current - delta;

      if (value < 0) {
        return 0;
      }

      return value;
    });
  }, !isPoisonedValue);

  useEffect(() => {
    if (healthValue > healthMaximumTotalValue) {
      resetHealth();
    }
  }, [healthMaximumTotalValue, healthValue, resetHealth]);

  return (
    <LabelledProgressBar
      attached="below"
      label={`${healthValue}/${healthMaximumTotalValue}${
        isPoisonedValue
          ? ` (${healthMaximumValue}) Poison: ${formatMilliseconds(poisonDurationValue)}`
          : ""
      }`}
      sibling={
        isPoisonedValue ? (
          <ProgressBar animated key={2} now={penalty} striped variant="secondary" />
        ) : null
      }
      value={(healthValue / healthMaximumTotalValue) * (100 - penalty)}
      variant="dark"
    />
  );
}

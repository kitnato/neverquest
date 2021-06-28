import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import { health, healthRegen } from "state/atoms";
import formatCountdown from "utilities/formatCountdown";

export default function HealthRegen() {
  const [healthValue, setHealth] = useRecoilState(health);
  const { rate: healthRegenRate, current: healthRegenAmount } =
    useRecoilValue(healthRegen);
  const [deltaHealthRegen, setDeltaHealthRegen] = useState(0);
  const isRecovering = healthValue.current < healthValue.max;
  const displayHealthRegen = isRecovering ? deltaHealthRegen : healthRegenRate;

  useAnimation((deltaTime) => {
    if (deltaHealthRegen >= healthRegenRate) {
      setHealth({
        ...healthValue,
        current: healthValue.current + healthRegenAmount,
      });
      setDeltaHealthRegen(0);
    } else {
      setDeltaHealthRegen(deltaHealthRegen + deltaTime);
    }
  }, !isRecovering);

  return (
    <Progress
      variant="warning"
      value={(displayHealthRegen / healthRegenRate) * 100}
      label={formatCountdown(healthRegenRate - displayHealthRegen)}
    />
  );
}

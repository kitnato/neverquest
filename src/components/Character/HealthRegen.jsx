import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import { health, healthRegen } from "state/character/atoms";
import { currentHealth } from "state/character/selectors";
import formatCountdown from "utilities/formatCountdown";

export default function Health() {
  const healthValue = useRecoilValue(health);
  const setHealth = useSetRecoilState(currentHealth);
  const { rate: healthRegenRate, amount: healthRegenAmount } =
    useRecoilValue(healthRegen);
  const [deltaHealthRegen, setDeltaHealthRegen] = useState(0);
  const recovering = healthValue.current < healthValue.max;
  const displayHealthRegen = recovering ? deltaHealthRegen : healthRegenRate;

  useAnimation((deltaTime) => {
    if (deltaHealthRegen >= healthRegenRate) {
      setHealth(healthRegenAmount);
      setDeltaHealthRegen(0);
    } else if (recovering) {
      setDeltaHealthRegen(deltaHealthRegen + deltaTime);
    }
  }, !recovering);

  return (
    <Progress
      variant="warning"
      value={(displayHealthRegen / healthRegenRate) * 100}
      label={formatCountdown(healthRegenRate - displayHealthRegen)}
    />
  );
}

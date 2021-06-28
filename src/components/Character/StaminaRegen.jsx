import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import { stamina, staminaRegen } from "state/atoms";
import formatCountdown from "utilities/formatCountdown";

export default function StaminaRegen() {
  const [staminaValue, setStamina] = useRecoilState(stamina);
  const { rate: staminaRegenRate, current: staminaRegenAmount } =
    useRecoilValue(staminaRegen);
  const [elapsedStaminaRegen, setStaminaRegen] = useState(0);
  const isRecovering = staminaValue.current < staminaValue.max;
  const displayStaminaRegen = isRecovering
    ? elapsedStaminaRegen
    : staminaRegenRate;

  useAnimation((deltaTime) => {
    if (elapsedStaminaRegen >= staminaRegenRate) {
      setStamina({
        ...staminaValue,
        current: staminaValue.current + staminaRegenAmount,
      });
      setStaminaRegen(0);
    } else {
      setStaminaRegen(elapsedStaminaRegen + deltaTime);
    }
  }, !isRecovering);

  return (
    <Progress
      variant="warning"
      value={(displayStaminaRegen / staminaRegenRate) * 100}
      label={formatCountdown(staminaRegenRate - displayStaminaRegen)}
    />
  );
}

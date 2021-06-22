import React, { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import { stamina, staminaRegen } from "state/character/atoms";
import { currentStamina } from "state/character/selectors";
import formatCountdown from "utilities/formatCountdown";

export default function StaminaRegen() {
  const staminaValue = useRecoilValue(stamina);
  const setStamina = useSetRecoilState(currentStamina);
  const { rate: staminaRegenRate, amount: staminaRegenAmount } =
    useRecoilValue(staminaRegen);
  const [elapsedStaminaRegen, setStaminaRegen] = useState(0);
  const recovering = staminaValue.current < staminaValue.max;
  const displayStaminaRegen = recovering
    ? elapsedStaminaRegen
    : staminaRegenRate;

  useAnimation((deltaTime) => {
    if (elapsedStaminaRegen >= staminaRegenRate) {
      setStamina(staminaRegenAmount);
      setStaminaRegen(0);
    } else if (recovering) {
      setStaminaRegen(elapsedStaminaRegen + deltaTime);
    }
  }, !recovering);

  return (
    <Progress
      variant="warning"
      value={(displayStaminaRegen / staminaRegenRate) * 100}
      label={formatCountdown(staminaRegenRate - displayStaminaRegen)}
    />
  );
}

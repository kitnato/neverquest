import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import { isRecovering } from "state/character";

export default function Regen({
  regenRate,
  regenAmount,
  resourceCurrent,
  resourceMax,
}) {
  const [resourceCurrentValue, setResource] = useRecoilState(resourceCurrent);
  const isRecoveringValue = useRecoilValue(isRecovering);
  const regenRateValue = useRecoilValue(regenRate);
  const resourceMaxValue = useRecoilValue(resourceMax);
  const regenAmountValue = useRecoilValue(regenAmount);
  const [deltaRegen, setRegen] = useState(0);
  const canRecover = resourceCurrentValue < resourceMaxValue;

  useAnimation((deltaTime) => {
    if (deltaRegen >= regenRateValue) {
      const newResourceValue = resourceCurrentValue + regenAmountValue;

      setResource(newResourceValue);
      setRegen(0);
    } else {
      setRegen(deltaRegen + deltaTime);
    }
  }, !canRecover || isRecoveringValue);

  return (
    <Progress
      attached="above"
      size="tiny"
      value={(deltaRegen / regenRateValue) * 100}
      variant="warning"
    />
  );
}

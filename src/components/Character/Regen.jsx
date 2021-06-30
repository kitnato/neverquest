import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import formatCountdown from "utilities/formatCountdown";

export default function Regen({ resource, regen }) {
  const [resourceValue, setResource] = useRecoilState(resource);
  const { rate, current: regenValue } = useRecoilValue(regen);
  const [elapsedRegen, setRegen] = useState(0);
  const isRecovering = resourceValue.current < resourceValue.max;
  const displayRegen = isRecovering ? elapsedRegen : rate;

  useAnimation((deltaTime) => {
    if (elapsedRegen >= rate) {
      setResource({
        ...resourceValue,
        current: resourceValue.current + regenValue,
      });
      setRegen(0);
    } else {
      setRegen(elapsedRegen + deltaTime);
    }
  }, !isRecovering);

  return (
    <Progress
      variant="warning"
      value={(displayRegen / rate) * 100}
      label={formatCountdown(rate - displayRegen)}
    />
  );
}

import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import formatCountdown from "utilities/formatCountdown";

export default function Regen({ resource, regen }) {
  const [resourceValue, setResource] = useRecoilState(resource);
  const { rate, current: regenValue } = useRecoilValue(regen);
  const [deltaRegen, setRegen] = useState(rate);
  const isRecovering = resourceValue.current < resourceValue.max;

  useAnimation((deltaTime) => {
    if (deltaRegen >= rate) {
      const newResourceValue = resourceValue.current + regenValue;

      setResource({
        ...resourceValue,
        current: newResourceValue,
      });
      setRegen(0);
    } else {
      setRegen(deltaRegen + deltaTime);
    }
  }, !isRecovering);

  return (
    <Progress
      attached="above"
      label={isRecovering ? formatCountdown(rate - deltaRegen) : "Rested"}
      value={((isRecovering ? deltaRegen : rate) / rate) * 100}
      size="tiny"
      variant="info"
    />
  );
}

import React, { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";

export default function Regen({ resource, regen }) {
  const [resourceValue, setResource] = useRecoilState(resource);
  const { rate, current: regenValue } = useRecoilValue(regen);
  const [deltaRegen, setRegen] = useState(0);
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
      size="tiny"
      value={(deltaRegen / rate) * 100}
      variant="info"
    />
  );
}

import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";

export default function Regen({ resource, regenRate, regenAmount }) {
  const [resourceValue, setResource] = useRecoilState(resource);
  const { current: rate } = useRecoilValue(regenRate);
  const { current: amount } = useRecoilValue(regenAmount);
  const [deltaRegen, setRegen] = useState(0);
  const isRecovering = resourceValue.current < resourceValue.max;

  useAnimation((deltaTime) => {
    if (deltaRegen >= rate) {
      const newResourceValue = resourceValue.current + amount;

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
      variant="warning"
    />
  );
}

import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import { isRecovering } from "state/character";

export default function Regen({
  regenRate,
  resourceCurrent,
  isResourceMaxedOut,
}) {
  const isRecoveringValue = useRecoilValue(isRecovering);
  const regenRateValue = useRecoilValue(regenRate);
  const isResourceMaxedOutValue = useRecoilValue(isResourceMaxedOut);
  const setCurrentResource = useSetRecoilState(resourceCurrent);
  const [deltaRegen, setDeltaRegen] = useState(0);

  useEffect(() => {
    if (deltaRegen >= regenRateValue) {
      setDeltaRegen(0);
      setCurrentResource((currentResource) => currentResource + 1);
    }
  }, [deltaRegen, regenRateValue, setCurrentResource]);

  useAnimation((deltaTime) => {
    setDeltaRegen((currentDelta) => currentDelta + deltaTime);
  }, isResourceMaxedOutValue || isRecoveringValue);

  return (
    <Progress
      attached="above"
      size="tiny"
      value={(deltaRegen / regenRateValue) * 100}
      variant="warning"
    />
  );
}

import { useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import { isRecovering } from "state/character";

export default function Regen({
  regenRate,
  regenAmount,
  resourceCurrent,
  isResourceMaxedOut,
}) {
  const isRecoveringValue = useRecoilValue(isRecovering);
  const regenRateValue = useRecoilValue(regenRate);
  const regenAmountValue = useRecoilValue(regenAmount);
  const isResourceMaxedOutValue = useRecoilValue(isResourceMaxedOut);
  const setCurrentResource = useSetRecoilState(resourceCurrent);
  const [deltaRegen, setRegen] = useState(0);

  useAnimation((deltaTime) => {
    if (deltaRegen >= regenRateValue) {
      setCurrentResource(
        (currentResource) => currentResource + regenAmountValue
      );
      setRegen(0);
    } else {
      setRegen(deltaRegen + deltaTime);
    }
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

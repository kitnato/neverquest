import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";

import Progress from "components/Progress";
import useAnimation from "hooks/useAnimation";
import { isRecovering } from "state/character";

export default function Regeneration({
  regenerationRate,
  resourceCurrent,
  resourceDelta,
  isResourceMaxedOut,
}) {
  const isRecoveringValue = useRecoilValue(isRecovering);
  const regenerationRateValue = useRecoilValue(regenerationRate);
  const isResourceMaxedOutValue = useRecoilValue(isResourceMaxedOut);
  const setCurrentResource = useSetRecoilState(resourceCurrent);
  const setDeltaResource = useSetRecoilState(resourceDelta);
  const [deltaRegeneration, setDeltaRegeneration] = useState(0);

  useEffect(() => {
    if (deltaRegeneration >= regenerationRateValue) {
      setDeltaRegeneration(0);
      setCurrentResource((currentResource) => currentResource + 1);
      setDeltaResource(1);
    }
  }, [
    deltaRegeneration,
    regenerationRateValue,
    setCurrentResource,
    setDeltaResource,
  ]);

  useAnimation((deltaTime) => {
    setDeltaRegeneration((currentDelta) => currentDelta + deltaTime);
  }, isResourceMaxedOutValue || isRecoveringValue);

  return (
    <Progress
      attached="above"
      size="tiny"
      value={(deltaRegeneration / regenerationRateValue) * 100}
      variant="warning"
    />
  );
}

import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue, RecoilState, RecoilValueReadOnly } from "recoil";

import Progress from "neverquest/components/Progress";
import { UIAttachment, UISize, UIVariant } from "neverquest/env.d";
import useAnimation from "neverquest/hooks/useAnimation";
import { isRecovering } from "neverquest/state/character";

export default function Regeneration({
  regenerationRate,
  resourceCurrent,
  resourceDelta,
  isResourceMaxedOut,
}: {
  regenerationRate: RecoilValueReadOnly<number>;
  resourceCurrent: RecoilState<number>;
  resourceDelta: RecoilState<number>;
  isResourceMaxedOut: RecoilValueReadOnly<boolean>;
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
  }, [deltaRegeneration, regenerationRateValue, setCurrentResource, setDeltaResource]);

  useAnimation((deltaTime) => {
    setDeltaRegeneration((currentDelta) => currentDelta + deltaTime);
  }, isResourceMaxedOutValue || isRecoveringValue);

  return (
    <Progress
      attached={UIAttachment.Above}
      size={UISize.Tiny}
      value={(deltaRegeneration / regenerationRateValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}

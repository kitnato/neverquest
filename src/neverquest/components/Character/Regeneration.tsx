import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue, RecoilState, RecoilValueReadOnly } from "recoil";

import Progress from "neverquest/components/Progress";
import { UIAttachment, UISize, UIVariant } from "neverquest/env.d";
import useAnimation from "neverquest/hooks/useAnimation";
import { isRecovering } from "neverquest/state/character";
import formatCountdown from "neverquest/utilities/formatCountdown";

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

  useAnimation((deltaTime) => {
    setDeltaRegeneration((currentDelta) => currentDelta + deltaTime);
  }, isResourceMaxedOutValue || isRecoveringValue);

  useEffect(() => {
    if (deltaRegeneration >= regenerationRateValue) {
      setDeltaRegeneration(0);
      setCurrentResource((currentResource) => currentResource + 1);
      setDeltaResource(1);
    }
  }, [deltaRegeneration, regenerationRateValue]);

  // Catches any leftover increments after regeneration is complete.
  useEffect(() => {
    if (deltaRegeneration > 0 && isResourceMaxedOutValue) {
      setDeltaRegeneration(0);
    }
  }, [deltaRegeneration, isResourceMaxedOutValue]);

  const label = (() => {
    if (isRecoveringValue) {
      return "Recovering ...";
    }

    return `${deltaRegeneration === 0 ? "Regeneration" : "Regenerating"} ${formatCountdown(
      regenerationRateValue - deltaRegeneration
    )}`;
  })();

  return (
    <Progress
      attached={UIAttachment.Above}
      label={label}
      size={UISize.Tiny}
      value={(deltaRegeneration / regenerationRateValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}

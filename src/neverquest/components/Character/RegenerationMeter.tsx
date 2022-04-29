import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue, RecoilState, RecoilValueReadOnly } from "recoil";

import Progress from "neverquest/components/Progress";

import useAnimation from "neverquest/hooks/useAnimation";
import { isRecovering } from "neverquest/state/character";
import {
  DeltaDisplay,
  UIAttachment,
  FloatingTextType,
  UISize,
  UIVariant,
} from "neverquest/types/ui";
import { formatMilliseconds } from "neverquest/utilities/helpers";

export default function RegenerationMeter({
  regenerationRate,
  atomResource,
  atomResourceDelta,
  isResourceMaxedOut,
}: {
  regenerationRate: RecoilValueReadOnly<number>;
  atomResource: RecoilState<number>;
  atomResourceDelta: RecoilState<DeltaDisplay>;
  isResourceMaxedOut: RecoilValueReadOnly<boolean>;
}) {
  const isRecoveringValue = useRecoilValue(isRecovering);
  const regenerationRateValue = useRecoilValue(regenerationRate);
  const isResourceMaxedOutValue = useRecoilValue(isResourceMaxedOut);
  const setCurrentResource = useSetRecoilState(atomResource);
  const setDeltaResource = useSetRecoilState(atomResourceDelta);
  const [deltaRegeneration, setDeltaRegeneration] = useState(0);

  useAnimation((deltaTime) => {
    setDeltaRegeneration((currentDelta) => currentDelta + deltaTime);
  }, isResourceMaxedOutValue || isRecoveringValue);

  useEffect(() => {
    if (deltaRegeneration >= regenerationRateValue) {
      setDeltaRegeneration(0);
      setCurrentResource((currentResource) => currentResource + 1);
      setDeltaResource({
        color: FloatingTextType.Positive,
        value: "+1",
      });
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

    return `${
      deltaRegeneration === 0
        ? "Regeneration"
        : `Regenerating ${formatMilliseconds(regenerationRateValue - deltaRegeneration)}`
    } (${formatMilliseconds(regenerationRateValue)})`;
  })();

  return (
    <Progress
      attached={UIAttachment.Above}
      disableTransitions
      label={label}
      size={UISize.Tiny}
      value={(deltaRegeneration / regenerationRateValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}

import { useEffect } from "react";
import { useSetRecoilState, useRecoilValue, RecoilState, RecoilValueReadOnly } from "recoil";

import RegenerationMeter from "neverquest/components/Character/RegenerationMeter";
import { DeltaDisplay, UIFloatingTextType } from "neverquest/env";
import { formatMilliseconds } from "neverquest/utilities/helpers";
import usePreviousValue from "neverquest/hooks/usePreviousValue";
import FloatingText from "../FloatingText";

export default function Regeneration({
  regenerationRate,
  atomResource,
  atomResourceDelta,
  atomDeltaRegenerationRate,
  isResourceMaxedOut,
}: {
  regenerationRate: RecoilValueReadOnly<number>;
  atomResource: RecoilState<number>;
  atomResourceDelta: RecoilState<DeltaDisplay>;
  atomDeltaRegenerationRate: RecoilState<DeltaDisplay>;
  isResourceMaxedOut: RecoilValueReadOnly<boolean>;
}) {
  const regenerationRateValue = useRecoilValue(regenerationRate);
  const setDeltaRegenerationRate = useSetRecoilState(atomDeltaRegenerationRate);

  const previousRegenerationRateValue = usePreviousValue(regenerationRateValue);

  useEffect(() => {
    if (previousRegenerationRateValue === null) {
      return;
    }

    const difference = regenerationRateValue - previousRegenerationRateValue;

    if (difference === 0) {
      return;
    }

    const isPositive = difference > 0;

    setDeltaRegenerationRate({
      color: isPositive ? UIFloatingTextType.Negative : UIFloatingTextType.Positive,
      value: `${isPositive ? "+" : "-"}${formatMilliseconds(Math.abs(difference))}`,
    });
  }, [previousRegenerationRateValue, regenerationRateValue]);

  return (
    <>
      <RegenerationMeter
        regenerationRate={regenerationRate}
        atomResource={atomResource}
        atomResourceDelta={atomResourceDelta}
        isResourceMaxedOut={isResourceMaxedOut}
      />

      <FloatingText atom={atomDeltaRegenerationRate} />
    </>
  );
}

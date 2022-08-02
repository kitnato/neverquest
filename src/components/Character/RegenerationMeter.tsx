import { useEffect, useState } from "react";
import { useSetRecoilState, useRecoilValue, RecoilState, RecoilValueReadOnly } from "recoil";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";

import useAnimation from "@neverquest/hooks/useAnimation";
import { isRecovering } from "@neverquest/state/character";
import { HealthChangeProps } from "@neverquest/types/props";
import { UIAttachment, UISize, UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/helpers";

export default function RegenerationMeter({
  atomReserve,
  isReserveMaxedOut,
  regenerationRate,
}: {
  atomReserve: RecoilState<HealthChangeProps>;
  isReserveMaxedOut: RecoilValueReadOnly<boolean>;
  regenerationRate: RecoilValueReadOnly<number>;
}) {
  const isRecoveringValue = useRecoilValue(isRecovering);
  const regenerationRateValue = useRecoilValue(regenerationRate);
  const isReserveMaxedOutValue = useRecoilValue(isReserveMaxedOut);
  const changeCurrentReserve = useSetRecoilState(atomReserve);
  const [deltaRegeneration, setDeltaRegeneration] = useState(0);

  useAnimation((delta) => {
    setDeltaRegeneration((current) => current + delta);
  }, isReserveMaxedOutValue || isRecoveringValue);

  useEffect(() => {
    if (deltaRegeneration >= regenerationRateValue) {
      setDeltaRegeneration(0);
      changeCurrentReserve(1);
    }
  }, [deltaRegeneration, regenerationRateValue]);

  // Catches any leftover increments after regeneration is complete.
  useEffect(() => {
    if (deltaRegeneration > 0 && isReserveMaxedOutValue) {
      setDeltaRegeneration(0);
    }
  }, [deltaRegeneration, isReserveMaxedOutValue]);

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
    <LabelledProgressBar
      attached={UIAttachment.Above}
      disableTransitions
      label={label}
      size={UISize.Tiny}
      value={(deltaRegeneration / regenerationRateValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}

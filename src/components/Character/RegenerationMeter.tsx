import { useEffect, useState } from "react";
import { RecoilValueReadOnly, useRecoilValue } from "recoil";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import { DELTA_RESERVE_REGENERATION } from "@neverquest/constants";
import useAnimation from "@neverquest/hooks/useAnimation";
import { isRecovering } from "@neverquest/state/character";
import { DeltaReserve, UIAttachment, UISize, UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export default function ({
  handleChangeReserve,
  isReserveMaxedOut,
  regenerationRate,
}: {
  handleChangeReserve: (change: DeltaReserve) => void;
  isReserveMaxedOut: RecoilValueReadOnly<boolean>;
  regenerationRate: RecoilValueReadOnly<number>;
}) {
  const isRecoveringValue = useRecoilValue(isRecovering);
  const isReserveMaxedOutValue = useRecoilValue(isReserveMaxedOut);
  const regenerationRateValue = useRecoilValue(regenerationRate);

  const [deltaRegeneration, setDeltaRegeneration] = useState(0);

  useAnimation((delta) => {
    setDeltaRegeneration((current) => current + delta);
  }, isReserveMaxedOutValue || isRecoveringValue);

  useEffect(() => {
    if (deltaRegeneration >= regenerationRateValue) {
      setDeltaRegeneration(0);
      handleChangeReserve({ value: DELTA_RESERVE_REGENERATION });
    }
  }, [handleChangeReserve, deltaRegeneration, regenerationRateValue]);

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

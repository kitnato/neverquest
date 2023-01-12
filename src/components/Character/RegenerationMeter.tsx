import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import { RESERVES } from "@neverquest/data/reserves";
import useAnimation from "@neverquest/hooks/useAnimation";
import { isRecovering } from "@neverquest/state/character";
import { ReserveType } from "@neverquest/types/enums";
import { UIAttachment, UISize, UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export default function ({ type }: { type: ReserveType.Health | ReserveType.Stamina }) {
  const {
    atomIsAtMaximum,
    atomRegenerationAmount,
    atomRegenerationDuration,
    atomRegenerationRate,
    useActionChange,
  } = RESERVES[type];

  const resetRegenerationDuration = useResetRecoilState(atomRegenerationDuration);
  const [regenerationDuration, setRegenerationDuration] = useRecoilState(atomRegenerationDuration);
  const isReserveAtMaximum = useRecoilValue(atomIsAtMaximum);
  const regenerationAmountValue = useRecoilValue(atomRegenerationAmount);
  const regenerationRateValue = useRecoilValue(atomRegenerationRate);
  const isRecoveringValue = useRecoilValue(isRecovering);

  const changeReserve = useActionChange();

  const regenerationProgress =
    regenerationDuration === 0 ? 0 : regenerationRateValue - regenerationDuration;

  useEffect(() => {
    if (isReserveAtMaximum) {
      resetRegenerationDuration();
    }
  }, [isReserveAtMaximum, resetRegenerationDuration]);

  useAnimation((delta) => {
    let newDuration = regenerationDuration - delta;

    if (newDuration <= 0) {
      changeReserve({ value: regenerationAmountValue });
      newDuration = regenerationRateValue;
    }

    setRegenerationDuration(newDuration);
  }, isReserveAtMaximum || isRecoveringValue);

  const label = (() => {
    if (isRecoveringValue) {
      return "Recovering ...";
    }

    return `${
      regenerationDuration === 0
        ? "Regeneration"
        : `Regenerating ${formatMilliseconds(regenerationProgress)}`
    } (${formatMilliseconds(regenerationRateValue)})`;
  })();

  return (
    <LabelledProgressBar
      attached={UIAttachment.Above}
      disableTransitions
      label={label}
      size={UISize.Tiny}
      value={(regenerationProgress / regenerationRateValue) * 100}
      variant={UIVariant.Secondary}
    />
  );
}

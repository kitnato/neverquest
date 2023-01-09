import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import LabelledProgressBar from "@neverquest/components/LabelledProgressBar";
import { RESERVES } from "@neverquest/data/reserves";
import useAnimation from "@neverquest/hooks/useAnimation";
import { isRecovering } from "@neverquest/state/character";
import { ReserveType } from "@neverquest/types/enums";
import { UIAttachment, UISize, UIVariant } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export default function ({ type }: { type: ReserveType.Health | ReserveType.Stamina }) {
  const { atomIsAtMaximum, atomRegenerationAmount, atomRegenerationRate, useActionChange } =
    RESERVES[type];

  const isReserveAtMaximum = useRecoilValue(atomIsAtMaximum);
  const regenerationAmountValue = useRecoilValue(atomRegenerationAmount);
  const regenerationRateValue = useRecoilValue(atomRegenerationRate);
  const isRecoveringValue = useRecoilValue(isRecovering);

  const [deltaRegeneration, setDeltaRegeneration] = useState(0);

  const changeReserve = useActionChange();

  useEffect(() => {
    if (deltaRegeneration >= regenerationRateValue) {
      setDeltaRegeneration(0);
      changeReserve({ value: regenerationAmountValue });
    }
  }, [deltaRegeneration, regenerationRateValue, regenerationAmountValue, changeReserve]);

  useAnimation((delta) => {
    setDeltaRegeneration((current) => current + delta);
  }, isReserveAtMaximum || isRecoveringValue);

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

import { useRecoilState, useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { RESERVES } from "@neverquest/data/reserves";
import { useAnimation } from "@neverquest/hooks/useAnimation";
import { isRecovering } from "@neverquest/state/character";
import { Reserve } from "@neverquest/types/enums";
import { UIAttachment, UISize } from "@neverquest/types/ui";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function RegenerationMeter({ type }: { type: Reserve.Health | Reserve.Stamina }) {
  const {
    atomIsAtMaximum,
    atomRegenerationAmount,
    atomRegenerationDuration,
    atomRegenerationRate,
    useActionChange,
  } = RESERVES[type];

  const [regenerationDuration, setRegenerationDuration] = useRecoilState(atomRegenerationDuration);
  const isReserveAtMaximum = useRecoilValue(atomIsAtMaximum);
  const regenerationAmountValue = useRecoilValue(atomRegenerationAmount);
  const regenerationRateValue = useRecoilValue(atomRegenerationRate);
  const isRecoveringValue = useRecoilValue(isRecovering);

  const changeReserve = useActionChange();

  const isHealth = type === Reserve.Health;
  const regenerationProgress =
    regenerationDuration === 0 ? 0 : regenerationRateValue - regenerationDuration;

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

    if (regenerationProgress === 0) {
      return `${isHealth ? "Health" : "Stamina"} regeneration (${formatMilliseconds(
        regenerationRateValue
      )})`;
    }

    return `Regenerating ${isHealth ? "health" : "stamina"} (${formatMilliseconds(
      regenerationRateValue - regenerationProgress
    )})`;
  })();

  return (
    <LabelledProgressBar
      attached={UIAttachment.Above}
      disableTransitions
      label={label}
      size={UISize.Tiny}
      value={(regenerationProgress / regenerationRateValue) * 100}
      variant="secondary"
    />
  );
}

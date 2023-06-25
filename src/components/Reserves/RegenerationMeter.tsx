import { useRecoilState, useRecoilValue } from "recoil";

import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { RESERVES } from "@neverquest/data/reserves";
import { useChangeHealth } from "@neverquest/hooks/actions/useChangeHealth";
import { useChangeStamina } from "@neverquest/hooks/actions/useChangeStamina";
import { useAnimation } from "@neverquest/hooks/useAnimation";
import { isRecovering } from "@neverquest/state/character";
import {
  healthRegenerationDuration,
  isHealthAtMaximum,
  isStaminaAtMaximum,
  staminaRegenerationDuration,
} from "@neverquest/state/reserves";
import {
  healthRegenerationAmount,
  healthRegenerationRate,
  staminaRegenerationAmount,
  staminaRegenerationRate,
} from "@neverquest/state/statistics";
import type { DeltaReserve } from "@neverquest/types/ui";
import type { Reserve } from "@neverquest/types/unions";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

const RESERVE_CHANGE: Record<Reserve, () => (change: DeltaReserve) => void> = {
  health: useChangeHealth,
  stamina: useChangeStamina,
};

export function RegenerationMeter({ type }: { type: Reserve }) {
  const isHealth = type === "health";

  const [regenerationDurationValue, setRegenerationDuration] = useRecoilState(
    isHealth ? healthRegenerationDuration : staminaRegenerationDuration
  );
  const isReserveAtMaximum = useRecoilValue(isHealth ? isHealthAtMaximum : isStaminaAtMaximum);
  const regenerationAmountValue = useRecoilValue(
    isHealth ? healthRegenerationAmount : staminaRegenerationAmount
  );
  const regenerationRateValue = useRecoilValue(
    isHealth ? healthRegenerationRate : staminaRegenerationRate
  );
  const isRecoveringValue = useRecoilValue(isRecovering);

  const changeReserve = RESERVE_CHANGE[type]();

  const { label } = RESERVES[type];
  const regenerationProgress =
    regenerationDurationValue === 0 ? 0 : regenerationRateValue - regenerationDurationValue;

  useAnimation((delta) => {
    let newDuration = regenerationDurationValue - delta;

    if (newDuration <= 0) {
      changeReserve({ value: regenerationAmountValue });
      newDuration = regenerationRateValue;
    }

    setRegenerationDuration(newDuration);
  }, isReserveAtMaximum || isRecoveringValue);

  const details = (() => {
    if (isRecoveringValue) {
      return "Recovering ...";
    }

    if (regenerationProgress === 0) {
      return `${label} regeneration (${formatMilliseconds(regenerationRateValue)})`;
    }

    return `Regenerating ${type} (${formatMilliseconds(
      regenerationRateValue - regenerationProgress
    )})`;
  })();

  return (
    <LabelledProgressBar
      attached="above"
      disableTransitions
      label={details}
      size="tiny"
      value={(regenerationProgress / regenerationRateValue) * 100}
      variant="secondary"
    />
  );
}

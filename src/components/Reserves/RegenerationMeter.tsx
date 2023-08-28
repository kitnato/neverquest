import { useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { RESERVES } from "@neverquest/data/reserves";
import { ReactComponent as IconHealth } from "@neverquest/icons/health.svg";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import { isRecovering } from "@neverquest/state/character";
import {
  isBlighted,
  isHealthAtMaximum,
  isPoisoned,
  isStaminaAtMaximum,
  regenerationAmount,
  regenerationDuration,
  regenerationRate,
} from "@neverquest/state/reserves";
import type { Reserve } from "@neverquest/types/unions";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function RegenerationMeter({ type }: { type: Reserve }) {
  const isHealth = type === "health";

  const regenerationDurationValue = useRecoilValue(regenerationDuration(type));
  const isReserveAtMaximum = useRecoilValue(isHealth ? isHealthAtMaximum : isStaminaAtMaximum);
  const regenerationAmountValue = useRecoilValue(regenerationAmount(type));
  const regenerationRateValue = useRecoilValue(regenerationRate(type));
  const isBlightedValue = useRecoilValue(isBlighted);
  const isPoisonedValue = useRecoilValue(isPoisoned);
  const isRecoveringValue = useRecoilValue(isRecovering);
  const resetRegenerationDuration = useResetRecoilState(regenerationDuration(type));

  const { label } = RESERVES[type];
  const isAiling = isHealth ? isPoisonedValue : isBlightedValue;
  const ReserveIcon = isHealth ? IconHealth : IconStamina;
  const regenerationProgress =
    regenerationDurationValue === 0 ? 0 : regenerationRateValue - regenerationDurationValue;

  // Needed to catch attribute resets and poison/blight penalties.
  useEffect(() => {
    if (isAiling && isReserveAtMaximum) {
      resetRegenerationDuration();
    }
  }, [isAiling, isReserveAtMaximum, resetRegenerationDuration]);

  const details = (() => {
    if (isRecoveringValue) {
      return "Recovering ...";
    }

    if (regenerationProgress === 0) {
      return (
        <span>
          {`${label} regeneration`}
          <br />
          <IconImage Icon={ReserveIcon} size="tiny" />
          &nbsp;{`${regenerationAmountValue} per ${formatMilliseconds(regenerationRateValue)}`}
        </span>
      );
    }

    return (
      <span>
        {`Regenerating ${type}`}
        <br />
        <IconImage Icon={ReserveIcon} size="tiny" />
        &nbsp;
        {`${regenerationAmountValue} in ${formatMilliseconds(
          regenerationRateValue - regenerationProgress,
        )}`}
      </span>
    );
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

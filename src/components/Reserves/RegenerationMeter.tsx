import { useEffect } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

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
import { formatTime } from "@neverquest/utilities/formatters";

export function RegenerationMeter({ type }: { type: Reserve }) {
  const isHealth = type === "health";

  const [regenerationDurationValue, setRegenerationDuration] = useRecoilState(
    regenerationDuration(type),
  );
  const isReserveAtMaximum = useRecoilValue(isHealth ? isHealthAtMaximum : isStaminaAtMaximum);
  const isAiling = useRecoilValue(isHealth ? isPoisoned : isBlighted);
  const regenerationAmountValue = useRecoilValue(regenerationAmount(type));
  const regenerationRateValue = useRecoilValue(regenerationRate(type));
  const isRecoveringValue = useRecoilValue(isRecovering);
  const resetRegenerationDuration = useResetRecoilState(regenerationDuration(type));

  const { label } = RESERVES[type];
  const ReserveIcon = isHealth ? IconHealth : IconStamina;
  const regenerationProgress =
    regenerationDurationValue === 0 ? 0 : regenerationRateValue - regenerationDurationValue;

  useEffect(() => {
    if (isAiling) {
      // Catches attribute resets and poison/blight penalties.
      if (isReserveAtMaximum && regenerationDurationValue !== 0) {
        console.log("reset regen");
        resetRegenerationDuration();
      }

      // TODO - Catches poison/blight penalty changes.
      else if (!isReserveAtMaximum && regenerationDurationValue === 0) {
        console.log("ailment change");
        setRegenerationDuration(regenerationAmountValue);
      }
    }
  }, [
    isAiling,
    isReserveAtMaximum,
    regenerationAmountValue,
    regenerationDurationValue,
    resetRegenerationDuration,
    setRegenerationDuration,
  ]);

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
          &nbsp;{`${regenerationAmountValue} per ${formatTime(regenerationRateValue)}`}
        </span>
      );
    }

    return (
      <span>
        {`Regenerating ${type}`}
        <br />
        <IconImage Icon={ReserveIcon} size="tiny" />
        &nbsp;
        {`${regenerationAmountValue} in ${formatTime(
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

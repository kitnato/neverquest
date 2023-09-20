import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { RESERVES } from "@neverquest/data/reserves";
import { ReactComponent as IconHealth } from "@neverquest/icons/health.svg";
import { ReactComponent as IconStamina } from "@neverquest/icons/stamina.svg";
import { isRecovering } from "@neverquest/state/character";
import {
  regenerationAmount,
  regenerationDuration,
  regenerationRate,
} from "@neverquest/state/reserves";
import type { Reserve } from "@neverquest/types/unions";
import { formatTime } from "@neverquest/utilities/formatters";

export function RegenerationMeter({ type }: { type: Reserve }) {
  const isHealth = type === "health";

  const regenerationAmountValue = useRecoilValue(regenerationAmount(type));
  const regenerationDurationValue = useRecoilValue(regenerationDuration(type));
  const regenerationRateValue = useRecoilValue(regenerationRate(type));
  const isRecoveringValue = useRecoilValue(isRecovering);

  const { label } = RESERVES[type];
  const ReserveIcon = isHealth ? IconHealth : IconStamina;
  const regenerationProgress =
    regenerationDurationValue === 0 ? 0 : regenerationRateValue - regenerationDurationValue;

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

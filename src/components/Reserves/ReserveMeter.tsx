import { useEffect } from "react";
import { ProgressBar } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { ReactComponent as IconBlight } from "@neverquest/icons/blight.svg";
import { ReactComponent as IconPoison } from "@neverquest/icons/poison.svg";
import {
  blightMagnitude,
  health,
  healthMaximum,
  healthMaximumTotal,
  isBlighted,
  isPoisoned,
  poisonDuration,
  regenerationDuration,
  stamina,
  staminaMaximum,
  staminaMaximumTotal,
} from "@neverquest/state/reserves";
import type { BlightMagnitude } from "@neverquest/types";
import type { Reserve } from "@neverquest/types/unions";
import { formatPercentage, formatTime } from "@neverquest/utilities/formatters";

export function ReserveMeter({ type }: { type: Reserve }) {
  const isHealth = type === "health";

  const ailmentValue = useRecoilValue<BlightMagnitude | number>(
    isHealth ? poisonDuration : blightMagnitude,
  );
  const isAiling = useRecoilValue(isHealth ? isPoisoned : isBlighted);
  const reserveValue = useRecoilValue(isHealth ? health : stamina);
  const reserveMaximumValue = useRecoilValue(isHealth ? healthMaximum : staminaMaximum);
  const reserveMaximumTotalValue = useRecoilValue(
    isHealth ? healthMaximumTotal : staminaMaximumTotal,
  );
  const resetReserve = useResetRecoilState(isHealth ? health : stamina);
  const resetRegenerationDuration = useResetRecoilState(regenerationDuration(type));

  const penalty = Math.round(
    ((reserveMaximumValue - reserveMaximumTotalValue) / reserveMaximumValue) * 100,
  );

  // Catches attribute resets and poison/blight penalties.
  useEffect(() => {
    if (reserveValue > reserveMaximumTotalValue) {
      resetReserve();
      resetRegenerationDuration();
    }
  }, [reserveMaximumTotalValue, reserveValue, resetRegenerationDuration, resetReserve]);

  return (
    <LabelledProgressBar
      attached="below"
      label={
        <>
          {`${reserveValue}/${reserveMaximumTotalValue}`}
          {isAiling && (
            <>
              {` (${reserveMaximumValue}) `}
              <IconImage Icon={isHealth ? IconPoison : IconBlight} size="tiny" />
              {` ${
                typeof ailmentValue === "number"
                  ? formatTime(ailmentValue)
                  : formatPercentage(ailmentValue.percentage, 0)
              }`}
            </>
          )}
        </>
      }
      sibling={
        isAiling ? <ProgressBar animated key={2} now={penalty} striped variant="secondary" /> : null
      }
      value={(reserveValue / reserveMaximumTotalValue) * (100 - penalty)}
      variant="dark"
    />
  );
}

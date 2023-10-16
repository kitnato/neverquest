import { useEffect } from "react";
import { ProgressBar, Stack } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { FloatingTextQueue } from "../FloatingTextQueue";
import { IconImage } from "@neverquest/components/IconImage";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
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
import { formatValue } from "@neverquest/utilities/formatters";

export function ReserveMeter({ reserve }: { reserve: Reserve }) {
  const isHealth = reserve === "health";
  const reserveMaximum = isHealth ? healthMaximum : staminaMaximum;

  const ailmentValue = useRecoilValue<BlightMagnitude | number>(
    isHealth ? poisonDuration : blightMagnitude,
  );
  const isAiling = useRecoilValue(isHealth ? isPoisoned : isBlighted);
  const reserveValue = useRecoilValue(isHealth ? health : stamina);
  const reserveMaximumValue = useRecoilValue(reserveMaximum);
  const reserveMaximumTotalValue = useRecoilValue(
    isHealth ? healthMaximumTotal : staminaMaximumTotal,
  );
  const resetReserve = useResetRecoilState(isHealth ? health : stamina);
  const resetRegenerationDuration = useResetRecoilState(regenerationDuration(reserve));

  const deltaReserveMaximum = isHealth ? "healthMaximum" : "staminaMaximum";
  const penalty = Math.round(
    ((reserveMaximumValue - reserveMaximumTotalValue) / reserveMaximumValue) * 100,
  );

  useDeltaText({
    delta: deltaReserveMaximum,
    value: reserveMaximum,
  });

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
        <Stack direction="horizontal" gap={1}>
          <Stack direction="horizontal">
            {`${formatValue({ value: reserveValue })}/`}

            {formatValue({
              value: reserveMaximumTotalValue,
            })}

            <FloatingTextQueue delta={deltaReserveMaximum} />
          </Stack>

          {isAiling && (
            <>
              {`(${formatValue({ value: reserveMaximumValue })})`}

              <IconImage Icon={isHealth ? IconPoison : IconBlight} isStencilled size="small" />

              {`${
                typeof ailmentValue === "number"
                  ? formatValue({ format: "time", value: ailmentValue })
                  : formatValue({
                      decimals: 0,
                      format: "percentage",
                      value: ailmentValue.percentage,
                    })
              }`}
            </>
          )}
        </Stack>
      }
      sibling={
        isAiling ? <ProgressBar animated key={2} now={penalty} striped variant="secondary" /> : null
      }
      value={(reserveValue / reserveMaximumTotalValue) * (100 - penalty)}
      variant="dark"
    />
  );
}

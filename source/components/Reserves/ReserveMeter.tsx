import { useEffect } from "react";
import { ProgressBar, Stack } from "react-bootstrap";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { LABEL_MAXIMUM, PERCENTAGE_POINTS } from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { usePreviousValue } from "@neverquest/hooks/usePreviousValue";
import IconBlight from "@neverquest/icons/blight.svg?react";
import IconPoison from "@neverquest/icons/poison.svg?react";
import {
  blightMagnitude,
  health,
  healthMaximum,
  healthMaximumPoisoned,
  isBlighted,
  isPoisoned,
  poisonDuration,
  regenerationDuration,
  stamina,
  staminaMaximum,
  staminaMaximumBlighted,
} from "@neverquest/state/reserves";
import type { Reserve } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export function ReserveMeter({ reserve }: { reserve: Reserve }) {
  const isHealth = reserve === "health";
  const reserveState = isHealth ? health : stamina;
  const reserveMaximum = isHealth ? healthMaximum : staminaMaximum;

  const [reserveValue, setReserve] = useRecoilState(reserveState);
  const ailmentValue = useRecoilValue(isHealth ? poisonDuration : blightMagnitude);
  const isAiling = useRecoilValue(isHealth ? isPoisoned : isBlighted);
  const reserveMaximumValue = useRecoilValue(reserveMaximum);
  const reserveMaximumAilingValue = useRecoilValue(
    isHealth ? healthMaximumPoisoned : staminaMaximumBlighted,
  );
  const resetReserve = useResetRecoilState(reserveState);
  const resetRegenerationDuration = useResetRecoilState(regenerationDuration(reserve));

  const deltaReserveMaximum = isHealth ? "healthMaximum" : "staminaMaximum";
  const penalty = Math.round(
    ((reserveMaximumValue - reserveMaximumAilingValue) / reserveMaximumValue) * PERCENTAGE_POINTS,
  );

  useDeltaText({
    delta: deltaReserveMaximum,
    state: reserveMaximum,
    suffix: LABEL_MAXIMUM,
  });

  // Have current health and stamina increase the same if the maximum is increased (e.g. via attribute).
  const previousReserveMaximumAiling = usePreviousValue(reserveMaximumAilingValue);
  const reserveMaximumDifference =
    previousReserveMaximumAiling === undefined
      ? 0
      : reserveMaximumAilingValue - previousReserveMaximumAiling;

  useEffect(() => {
    if (!isAiling && reserveMaximumDifference > 0 && reserveValue < reserveMaximumAilingValue) {
      setReserve((currentReserve) => currentReserve + reserveMaximumDifference);
    }
  }, [isAiling, reserveMaximumAilingValue, reserveMaximumDifference, reserveValue, setReserve]);

  // Catches attribute resets and poison/blight penalties.
  useEffect(() => {
    if (reserveValue > reserveMaximumAilingValue) {
      resetReserve();
      resetRegenerationDuration();
    }
  }, [reserveMaximumAilingValue, reserveValue, resetRegenerationDuration, resetReserve]);

  return (
    <LabelledProgressBar
      attachment="below"
      sibling={
        isAiling ? (
          <ProgressBar animated={isHealth} key={2} now={penalty} striped variant="secondary" />
        ) : undefined
      }
      value={(reserveValue / reserveMaximumAilingValue) * (PERCENTAGE_POINTS - penalty)}
      variant="dark"
    >
      <Stack direction="horizontal" gap={1}>
        <span>
          {formatNumber({ value: reserveValue })}&nbsp;/&nbsp;
          {formatNumber({
            value: reserveMaximumAilingValue,
          })}
        </span>

        {isAiling && (
          <>
            <span>{` (${formatNumber({ value: reserveMaximumValue })})`}</span>

            <IconDisplay
              Icon={isHealth ? IconPoison : IconBlight}
              iconProps={{ className: "small stencilled" }}
            >
              <span>
                {isHealth
                  ? formatNumber({ format: "time", value: ailmentValue })
                  : formatNumber({
                      decimals: 1,
                      format: "percentage",
                      value: ailmentValue,
                    })}
              </span>
            </IconDisplay>
          </>
        )}

        <Stack direction="horizontal">
          <DeltasDisplay delta={isHealth ? "health" : "stamina"} />

          <DeltasDisplay delta={deltaReserveMaximum} />
        </Stack>
      </Stack>
    </LabelledProgressBar>
  );
}

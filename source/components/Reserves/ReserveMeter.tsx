import { useEffect } from "react";
import { ProgressBar, Stack } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { PERCENTAGE_POINTS } from "@neverquest/data/general";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
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
import type { BlightMagnitude } from "@neverquest/types";
import type { Reserve } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export function ReserveMeter({ reserve }: { reserve: Reserve }) {
  const isHealth = reserve === "health";
  const reserveMaximum = isHealth ? healthMaximum : staminaMaximum;

  const ailmentValue = useRecoilValue<BlightMagnitude | number>(
    isHealth ? poisonDuration : blightMagnitude,
  );
  const isAiling = useRecoilValue(isHealth ? isPoisoned : isBlighted);
  const reserveValue = useRecoilValue(isHealth ? health : stamina);
  const reserveMaximumValue = useRecoilValue(reserveMaximum);
  const reserveMaximumAilingValue = useRecoilValue(
    isHealth ? healthMaximumPoisoned : staminaMaximumBlighted,
  );
  const resetReserve = useResetRecoilState(isHealth ? health : stamina);
  const resetRegenerationDuration = useResetRecoilState(regenerationDuration(reserve));

  const deltaReserveMaximum = isHealth ? "healthMaximum" : "staminaMaximum";
  const penalty = Math.round(
    ((reserveMaximumValue - reserveMaximumAilingValue) / reserveMaximumValue) * PERCENTAGE_POINTS,
  );

  useDeltaText({
    delta: deltaReserveMaximum,
    state: reserveMaximum,
  });

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

            <IconImage className="small stencilled" Icon={isHealth ? IconPoison : IconBlight} />

            <span>
              {`${
                typeof ailmentValue === "number"
                  ? formatNumber({ format: "time", value: ailmentValue })
                  : formatNumber({
                      decimals: 0,
                      format: "percentage",
                      value: ailmentValue.percentage,
                    })
              }`}
            </span>
          </>
        )}

        <DeltasDisplay delta={deltaReserveMaximum} />
      </Stack>
    </LabelledProgressBar>
  );
}

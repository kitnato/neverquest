import { useEffect } from "react";
import { ProgressBar, Stack } from "react-bootstrap";
import { useRecoilValue, useResetRecoilState } from "recoil";

import { FloatingTextQueue } from "../FloatingTextQueue";
import { IconImage } from "@neverquest/components/IconImage";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
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
  const reserveMaximumTotalValue = useRecoilValue(
    isHealth ? healthMaximumPoisoned : staminaMaximumBlighted,
  );
  const resetReserve = useResetRecoilState(isHealth ? health : stamina);
  const resetRegenerationDuration = useResetRecoilState(regenerationDuration(reserve));

  const deltaReserveMaximum = isHealth ? "healthMaximum" : "staminaMaximum";
  const penalty = Math.round(
    ((reserveMaximumValue - reserveMaximumTotalValue) / reserveMaximumValue) * 100,
  );

  useDeltaText({
    delta: deltaReserveMaximum,
    state: reserveMaximum,
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
      sibling={
        isAiling ? <ProgressBar animated key={2} now={penalty} striped variant="secondary" /> : null
      }
      value={(reserveValue / reserveMaximumTotalValue) * (100 - penalty)}
      variant="dark"
    >
      <Stack direction="horizontal" gap={1}>
        {`${formatNumber({ value: reserveValue })}/${formatNumber({
          value: reserveMaximumTotalValue,
        })}`}

        <FloatingTextQueue delta={deltaReserveMaximum} />

        {isAiling && (
          <>
            {`(${formatNumber({ value: reserveMaximumValue })})`}

            <IconImage Icon={isHealth ? IconPoison : IconBlight} isStencilled size="small" />

            {`${
              typeof ailmentValue === "number"
                ? formatNumber({ format: "time", value: ailmentValue })
                : formatNumber({
                    decimals: 0,
                    format: "percentage",
                    value: ailmentValue.percentage,
                  })
            }`}
          </>
        )}
      </Stack>
    </LabelledProgressBar>
  );
}

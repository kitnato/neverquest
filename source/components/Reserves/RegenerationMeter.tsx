import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconImage } from "@neverquest/components/IconImage";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { RESERVES } from "@neverquest/data/reserves";
import IconHealth from "@neverquest/icons/health.svg?react";
import IconStamina from "@neverquest/icons/stamina.svg?react";
import { isRecovering } from "@neverquest/state/character";
import {
  regenerationAmount,
  regenerationDuration,
  regenerationRate,
} from "@neverquest/state/reserves";
import type { Reserve } from "@neverquest/types/unions";
import { formatNumber } from "@neverquest/utilities/formatters";

export function RegenerationMeter({ reserve }: { reserve: Reserve }) {
  const isHealth = reserve === "health";

  const regenerationAmountValue = useRecoilValue(regenerationAmount(reserve));
  const regenerationDurationValue = useRecoilValue(regenerationDuration(reserve));
  const regenerationRateValue = useRecoilValue(regenerationRate(reserve));
  const isRecoveringValue = useRecoilValue(isRecovering);

  const { label } = RESERVES[reserve];
  const ReserveIcon = isHealth ? IconHealth : IconStamina;
  const regenerationProgress =
    regenerationDurationValue === 0 ? 0 : regenerationRateValue - regenerationDurationValue;

  return (
    <LabelledProgressBar
      attachment="above"
      disableTransitions
      isSmall
      value={(regenerationProgress / regenerationRateValue) * 100}
      variant="secondary"
    >
      {(() => {
        if (isRecoveringValue) {
          return "Recovering ...";
        }

        if (regenerationProgress === 0) {
          return (
            <Stack>
              <span>{`${label} regeneration`}</span>

              <Stack direction="horizontal" gap={1}>
                <IconImage Icon={ReserveIcon} isSmall />

                <span>{`${regenerationAmountValue} per ${formatNumber({
                  format: "time",
                  value: regenerationRateValue,
                })}`}</span>
              </Stack>
            </Stack>
          );
        }

        return (
          <Stack>
            {`Regenerating ${reserve}`}

            <Stack direction="horizontal" gap={1}>
              <IconImage Icon={ReserveIcon} isSmall />

              <span>{`${regenerationAmountValue} in ${formatNumber({
                format: "time",
                value: regenerationRateValue - regenerationProgress,
              })}`}</span>
            </Stack>
          </Stack>
        );
      })()}
    </LabelledProgressBar>
  );
}

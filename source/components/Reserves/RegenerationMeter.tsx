import { Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { IconDisplay } from "../IconDisplay";
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar";
import { PERCENTAGE_POINTS } from "@neverquest/data/general";
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
      value={(regenerationProgress / regenerationRateValue) * PERCENTAGE_POINTS}
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

              <IconDisplay Icon={ReserveIcon} iconProps={{ className: "small" }}>
                <span>
                  {regenerationAmountValue}&nbsp;per&nbsp;
                  {formatNumber({
                    format: "time",
                    value: regenerationRateValue,
                  })}
                </span>
              </IconDisplay>
            </Stack>
          );
        }

        return (
          <Stack>
            {`Regenerating ${reserve}`}

            <Stack direction="horizontal" gap={1}>
              <IconDisplay Icon={ReserveIcon} iconProps={{ className: "small" }} />

              <span>
                {regenerationAmountValue}&nbsp;in&nbsp;
                {formatNumber({
                  format: "time",
                  value: regenerationRateValue - regenerationProgress,
                })}
              </span>
            </Stack>
          </Stack>
        );
      })()}
    </LabelledProgressBar>
  );
}

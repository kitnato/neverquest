import { Stack } from "react-bootstrap"
import { useRecoilValue } from "recoil"

import { IconDisplay } from "@neverquest/components/IconDisplay"
import { LabelledProgressBar } from "@neverquest/components/LabelledProgressBar"
import { PERCENTAGE_POINTS } from "@neverquest/data/general"
import { REGENERATION_METER_ANIMATION_THRESHOLD, RESERVES } from "@neverquest/data/reserves"
import { isRecovering } from "@neverquest/state/character"
import {
  regenerationAmount,
  regenerationDuration,
  regenerationRate,
} from "@neverquest/state/reserves"
import type { Reserve } from "@neverquest/types/unions"
import { capitalizeAll, formatNumber } from "@neverquest/utilities/formatters"

export function RegenerationMeter({ reserve }: { reserve: Reserve }) {
  const regenerationAmountValue = useRecoilValue(regenerationAmount(reserve))
  const regenerationDurationValue = useRecoilValue(regenerationDuration(reserve))
  const regenerationRateValue = useRecoilValue(regenerationRate(reserve))
  const isRecoveringValue = useRecoilValue(isRecovering)

  const { Icon } = RESERVES[reserve]
  const isContinuous =
    regenerationDurationValue > 0 &&
    regenerationRateValue <= REGENERATION_METER_ANIMATION_THRESHOLD
  const regenerationProgress =
    regenerationDurationValue === 0 ? 0 : regenerationRateValue - regenerationDurationValue

  return (
    <LabelledProgressBar
      attachment="above"
      disableTransitions
      isSmall
      striping={isContinuous ? { animated: true, striped: true } : undefined}
      value={
        isContinuous
          ? PERCENTAGE_POINTS
          : (regenerationProgress / regenerationRateValue) * PERCENTAGE_POINTS
      }
      variant="secondary"
    >
      {(() => {
        if (isRecoveringValue) {
          return <span>Recovering ...</span>
        }

        if (regenerationProgress === 0) {
          return (
            <Stack>
              <span>{capitalizeAll(reserve)}&nbsp;regeneration</span>

              <IconDisplay Icon={Icon} iconProps={{ className: `small` }}>
                <span>
                  {regenerationAmountValue}&nbsp;per&nbsp;
                  {formatNumber({
                    format: `time`,
                    value: regenerationRateValue,
                  })}
                </span>
              </IconDisplay>
            </Stack>
          )
        }

        return (
          <Stack>
            <span>Regenerating&nbsp;{reserve}</span>

            <IconDisplay Icon={Icon} iconProps={{ className: `small` }}>
              <span>
                {regenerationAmountValue}&nbsp;in&nbsp;
                {formatNumber({
                  format: `time`,
                  value: regenerationRateValue - regenerationProgress,
                })}
              </span>
            </IconDisplay>
          </Stack>
        )
      })()}
    </LabelledProgressBar>
  )
}

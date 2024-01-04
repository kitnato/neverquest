import { OverlayTrigger, Popover, PopoverBody, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { RecoveryMeter } from "@neverquest/components/Status/RecoveryMeter";

import { RECOVERY_RATE } from "@neverquest/data/statistics";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { useTimerDelta } from "@neverquest/hooks/useTimerDelta";
import IconRecovery from "@neverquest/icons/recovery.svg?react";
import IconResilience from "@neverquest/icons/resilience.svg?react";
import { isRecovering, recoveryDuration } from "@neverquest/state/character";
import { isShowing } from "@neverquest/state/isShowing";
import { masteryStatistic } from "@neverquest/state/masteries";
import { recoveryRate } from "@neverquest/state/statistics";
import { formatNumber } from "@neverquest/utilities/formatters";
import { getAnimationClass } from "@neverquest/utilities/getters";

export function Recovery() {
  const isRecoveringValue = useRecoilValue(isRecovering);
  const isShowingRecovery = useRecoilValue(isShowing("recovery"));
  const resilienceValue = useRecoilValue(masteryStatistic("resilience"));
  const setRecoveryDuration = useSetRecoilState(recoveryDuration);

  useTimerDelta({
    delta: setRecoveryDuration,
    stop: !isRecoveringValue,
  });

  useDeltaText({
    delta: "recoveryRate",
    format: "time",
    state: recoveryRate,
  });

  if (!isShowingRecovery) {
    return;
  }

  return (
    <IconDisplay
      className={getAnimationClass({ animation: "flipInX" })}
      Icon={IconRecovery}
      tooltip="Recovery rate"
    >
      <Stack className="w-100" direction="horizontal">
        <OverlayTrigger
          overlay={
            <Popover>
              <PopoverBody>
                <DetailsTable>
                  <tr>
                    <td>
                      <span>Base:</span>
                    </td>

                    <td>
                      <span>{formatNumber({ format: "time", value: RECOVERY_RATE })}</span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <IconDisplay Icon={IconResilience} iconProps={{ className: "small" }}>
                        <span>Resilience:</span>
                      </IconDisplay>
                    </td>

                    <td>
                      <span>
                        -
                        {formatNumber({
                          format: "percentage",
                          value: resilienceValue,
                        })}
                      </span>
                    </td>
                  </tr>
                </DetailsTable>
              </PopoverBody>
            </Popover>
          }
          trigger={resilienceValue > 0 ? ["focus", "hover"] : []}
        >
          <div className="w-100">
            <RecoveryMeter />
          </div>
        </OverlayTrigger>

        <DeltasDisplay delta="recoveryRate" />
      </Stack>
    </IconDisplay>
  );
}

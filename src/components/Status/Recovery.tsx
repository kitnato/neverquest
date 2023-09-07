import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { RecoveryMeter } from "@neverquest/components/Status/RecoveryMeter";
import { RECOVERY_RATE } from "@neverquest/data/statistics";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconRecovery } from "@neverquest/icons/recovery.svg";
import { ReactComponent as IconResilience } from "@neverquest/icons/resilience.svg";
import { isRecovering, recoveryDuration } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { masteries, masteryStatistic } from "@neverquest/state/masteries";
import { recoveryRate } from "@neverquest/state/statistics";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/utilities/constants";
import { formatPercentage, formatTime } from "@neverquest/utilities/formatters";

export function Recovery() {
  const isRecoveringValue = useRecoilValue(isRecovering);
  const isShowingRecovery = useRecoilValue(isShowing("recovery"));
  const { isUnlocked } = useRecoilValue(masteries("resilience"));
  const resilienceValue = useRecoilValue(masteryStatistic("resilience"));
  const setRecoveryDuration = useSetRecoilState(recoveryDuration);

  useAnimate({
    delta: setRecoveryDuration,
    stop: !isRecoveringValue,
  });

  useDeltaText({
    atomDelta: deltas("recoveryRate"),
    atomValue: recoveryRate,
    type: "time",
  });

  if (!isShowingRecovery) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <Stack className="w-100" direction="horizontal">
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header className="text-center">Recovery rate details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Base:</td>

                      <td>{formatTime(RECOVERY_RATE)}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <IconImage Icon={IconResilience} size="tiny" />
                        &nbsp;Resilience:
                      </td>

                      <td>{`-${formatPercentage(resilienceValue, 0)}`}</td>
                    </tr>
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            trigger={isUnlocked ? ["hover", "focus"] : []}
          >
            <div className="w-100">
              <RecoveryMeter />
            </div>
          </OverlayTrigger>

          <FloatingText deltaType="recoveryRate" />
        </Stack>
      }
      Icon={IconRecovery}
      isAnimated
      tooltip="Recovery rate"
    />
  );
}

import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { RecoveryMeter } from "@neverquest/components/Status/RecoveryMeter";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/data/general";
import { RECOVERY_RATE } from "@neverquest/data/statistics";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconRecovery } from "@neverquest/icons/recovery.svg";
import { ReactComponent as IconResilience } from "@neverquest/icons/resilience.svg";
import { isRecovering, recoveryDuration } from "@neverquest/state/character";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { isMasteryUnlocked, masteryStatistic } from "@neverquest/state/masteries";
import { recoveryRate } from "@neverquest/state/statistics";
import { formatValue } from "@neverquest/utilities/formatters";

export function Recovery() {
  const isRecoveringValue = useRecoilValue(isRecovering);
  const isMasteryUnlockedValue = useRecoilValue(isMasteryUnlocked("resilience"));
  const isShowingRecovery = useRecoilValue(isShowing("recovery"));
  const resilienceValue = useRecoilValue(masteryStatistic("resilience"));
  const setRecoveryDuration = useSetRecoilState(recoveryDuration);

  useAnimate({
    delta: setRecoveryDuration,
    stop: !isRecoveringValue,
  });

  useDeltaText({
    delta: deltas("recoveryRate"),
    format: "time",
    value: recoveryRate,
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

                      <td>{formatValue({ format: "time", value: RECOVERY_RATE })}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>
                        <Stack direction="horizontal" gap={1}>
                          <IconImage Icon={IconResilience} size="small" />
                          Resilience:
                        </Stack>
                      </td>

                      <td>{`-${formatValue({
                        decimals: 0,
                        format: "percentage",
                        value: resilienceValue,
                      })}`}</td>
                    </tr>
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            trigger={isMasteryUnlockedValue ? ["hover", "focus"] : []}
          >
            <span className="w-100">
              <RecoveryMeter />
            </span>
          </OverlayTrigger>

          <FloatingText delta="recoveryRate" />
        </Stack>
      }
      Icon={IconRecovery}
      isAnimated
      tooltip="Recovery rate"
    />
  );
}

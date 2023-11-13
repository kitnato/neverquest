import { OverlayTrigger, Popover, PopoverBody, PopoverHeader, Stack } from "react-bootstrap";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DeltasDisplay } from "@neverquest/components/DeltasDisplay";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { IconImage } from "@neverquest/components/IconImage";
import { RecoveryMeter } from "@neverquest/components/Status/RecoveryMeter";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/data/general";
import { RECOVERY_RATE } from "@neverquest/data/statistics";
import { useAnimate } from "@neverquest/hooks/useAnimate";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import IconRecovery from "@neverquest/icons/recovery.svg?react";
import IconResilience from "@neverquest/icons/resilience.svg?react";
import { isRecovering, recoveryDuration } from "@neverquest/state/character";
import { isShowing } from "@neverquest/state/isShowing";
import { isMasteryUnlocked, masteryStatistic } from "@neverquest/state/masteries";
import { recoveryRate } from "@neverquest/state/statistics";
import { formatNumber } from "@neverquest/utilities/formatters";

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
    delta: "recoveryRate",
    format: "time",
    state: recoveryRate,
  });

  if (!isShowingRecovery) {
    return;
  }

  return (
    <IconDisplay Icon={IconRecovery} isAnimated tooltip="Recovery rate">
      <Stack className="w-100" direction="horizontal">
        <OverlayTrigger
          overlay={
            <Popover>
              <PopoverHeader className="text-center">Recovery rate details</PopoverHeader>

              <PopoverBody>
                <DetailsTable>
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Base:</td>

                    <td>{formatNumber({ format: "time", value: RECOVERY_RATE })}</td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>
                      <Stack direction="horizontal" gap={1}>
                        <IconImage Icon={IconResilience} size="small" />
                        Resilience:
                      </Stack>
                    </td>

                    <td>{`-${formatNumber({
                      decimals: 0,
                      format: "percentage",
                      value: resilienceValue,
                    })}`}</td>
                  </tr>
                </DetailsTable>
              </PopoverBody>
            </Popover>
          }
          trigger={isMasteryUnlockedValue ? ["hover", "focus"] : []}
        >
          <span className="w-100">
            <RecoveryMeter />
          </span>
        </OverlayTrigger>

        <DeltasDisplay delta="recoveryRate" />
      </Stack>
    </IconDisplay>
  );
}

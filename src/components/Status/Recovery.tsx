import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { RecoveryMeter } from "@neverquest/components/Status/RecoveryMeter";
import { RECOVERY_RATE } from "@neverquest/data/statistics";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconRecovery } from "@neverquest/icons/recovery.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { recoveryRate } from "@neverquest/state/statistics";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/utilities/constants";
import { formatMilliseconds } from "@neverquest/utilities/formatters";

export function Recovery() {
  const isShowingRecovery = useRecoilValue(isShowing("recovery"));
  const isShowingRecoveryDetails = useRecoilValue(isShowing("recoveryDetails"));
  const recoveryRateValue = useRecoilValue(recoveryRate);

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
        <OverlayTrigger
          overlay={
            <Popover>
              <Popover.Header className="text-center">Recovery details</Popover.Header>

              <Popover.Body>
                <DetailsTable>
                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Base rate:</td>

                    <td>{formatMilliseconds(RECOVERY_RATE)}</td>
                  </tr>

                  <tr>
                    <td className={CLASS_TABLE_CELL_ITALIC}>Resilience attribute:</td>

                    <td>{`-${formatMilliseconds(RECOVERY_RATE - recoveryRateValue)}`}</td>
                  </tr>
                </DetailsTable>
              </Popover.Body>
            </Popover>
          }
          trigger={isShowingRecoveryDetails ? ["hover", "focus"] : []}
        >
          <Stack className="w-100" direction="horizontal">
            <RecoveryMeter />

            <FloatingText deltaType="recoveryRate" />
          </Stack>
        </OverlayTrigger>
      }
      Icon={IconRecovery}
      isAnimated
      tooltip="Recovery rate"
    />
  );
}

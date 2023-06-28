import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { DetailsTable } from "@neverquest/components/DetailsTable";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { RecoveryMeter } from "@neverquest/components/Status/RecoveryMeter";
import { RECOVERY_RATE } from "@neverquest/data/statistics";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconRecovery } from "@neverquest/icons/recovery.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { powerBonus, rawAttributeStatistic, recoveryRate } from "@neverquest/state/statistics";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/utilities/constants";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";

export function Recovery() {
  const isShowingRecovery = useRecoilValue(isShowing("recovery"));
  const isShowingRecoveryDetails = useRecoilValue(isShowing("recoveryDetails"));
  const recoveryRateValue = useRecoilValue(recoveryRate);
  const powerBonusValue = useRecoilValue(powerBonus("resilience"));
  const statisticValue = useRecoilValue(rawAttributeStatistic("resilience"));

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

                  {powerBonusValue > 0 && (
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Power bonus:</td>

                      <td>{`-${formatPercentage(
                        RECOVERY_RATE - statisticValue
                      )} +${formatPercentage(powerBonusValue)}`}</td>
                    </tr>
                  )}
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

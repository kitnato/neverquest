import { OverlayTrigger, Popover, Stack, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { RecoveryMeter } from "@neverquest/components/Character/RecoveryMeter";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CLASS_TABLE_CELL_ITALIC, LABEL_UNKNOWN, RECOVERY_RATE } from "@neverquest/constants";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/knockout.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { recoveryRate, skipRecoveryChance } from "@neverquest/state/statistics";
import { AttributeType, DeltaTextType, DeltaType, ShowingType } from "@neverquest/types/enums";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";

export function Recovery() {
  const isShowingRecovery = useRecoilValue(isShowing(ShowingType.Recovery));
  const skipRecoveryChanceValue = useRecoilValue(skipRecoveryChance);
  const recoveryRateValue = useRecoilValue(recoveryRate);

  const deltaRecoveryRate = deltas(DeltaType.RecoveryRate);

  const { name } = ATTRIBUTES[AttributeType.RecoveryRate];
  const showRecoveryRate = recoveryRateValue !== RECOVERY_RATE;
  const showSkipRecovery = skipRecoveryChanceValue > 0;

  useDeltaText({
    atomDelta: deltaRecoveryRate,
    atomValue: recoveryRate,
    type: DeltaTextType.Time,
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
              <Popover.Header>Recovery details</Popover.Header>

              <Popover.Body>
                <Table borderless size="sm">
                  <tbody>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Base rate:</td>

                      <td>{formatMilliseconds(RECOVERY_RATE)}</td>
                    </tr>

                    <tr>
                      {showRecoveryRate ? (
                        <>
                          <td className={CLASS_TABLE_CELL_ITALIC}>{name} attribute:</td>

                          <td>{`-${formatPercentage(1 - recoveryRateValue / RECOVERY_RATE)}`}</td>
                        </>
                      ) : (
                        <td className="text-end">{LABEL_UNKNOWN}</td>
                      )}
                    </tr>

                    <tr>
                      {showSkipRecovery ? (
                        <>
                          <td className={CLASS_TABLE_CELL_ITALIC}>Chance to skip recovery:</td>

                          <td>{formatPercentage(skipRecoveryChanceValue)}</td>
                        </>
                      ) : (
                        <td className="text-end">{LABEL_UNKNOWN}</td>
                      )}
                    </tr>
                  </tbody>
                </Table>
              </Popover.Body>
            </Popover>
          }
          placement="top"
          trigger={showRecoveryRate || showSkipRecovery ? ["hover", "focus"] : []}
        >
          <Stack className="w-100" direction="horizontal">
            <RecoveryMeter />

            <FloatingText type={DeltaType.RecoveryRate} />
          </Stack>
        </OverlayTrigger>
      }
      Icon={Icon}
      isAnimated
      tooltip="Recovery rate"
    />
  );
}

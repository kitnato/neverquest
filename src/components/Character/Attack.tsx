import { OverlayTrigger, Popover, Stack, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import AttackMeter from "@neverquest/components/Character/AttackMeter";
import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/constants";
import { ATTRIBUTES } from "@neverquest/constants/attributes";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/striking-splinter.svg";
import { attributes } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { totalAttackRate } from "@neverquest/state/statistics";
import { AttributeType, DeltaType, ShowingType } from "@neverquest/types/enums";
import {
  formatMilliseconds,
  formatPercentage,
  getComputedStat,
} from "@neverquest/utilities/helpers";

export default function () {
  const { points } = useRecoilValue(attributes(AttributeType.AttackRate));
  const showTotalAttackRateDetailsValue = useRecoilValue(
    isShowing(ShowingType.TotalAttackRateSummary)
  );
  const weaponValue = useRecoilValue(weapon);

  const { base, increment, name } = ATTRIBUTES[AttributeType.AttackRate];
  const deltaTotalAttackRate = deltas(DeltaType.TotalAttackRate);

  useDeltaText({
    deltaAtom: deltaTotalAttackRate,
    isTime: true,
    valueAtom: totalAttackRate,
  });

  const MeterWithDelta = () => (
    <Stack className="w-100" direction="horizontal">
      <AttackMeter />

      <FloatingText atom={deltaTotalAttackRate} />
    </Stack>
  );

  return (
    <IconDisplay
      contents={
        showTotalAttackRateDetailsValue ? (
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header as="h4">Attack rate details</Popover.Header>

                <Popover.Body>
                  <Table borderless size="sm">
                    <tbody>
                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>Weapon:</td>

                        <td>{formatMilliseconds(weaponValue.rate)}</td>
                      </tr>

                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>{`${name} attribute:`}</td>

                        <td>{`-${formatPercentage(
                          getComputedStat({ base, increment, points })
                        )}`}</td>
                      </tr>
                    </tbody>
                  </Table>
                </Popover.Body>
              </Popover>
            }
            placement="top"
          >
            <div className="w-100">
              <MeterWithDelta />
            </div>
          </OverlayTrigger>
        ) : (
          <MeterWithDelta />
        )
      }
      Icon={Icon}
      tooltip="Attack rate"
    />
  );
}

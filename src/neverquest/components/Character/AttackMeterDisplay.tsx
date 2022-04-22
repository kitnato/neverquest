import { useEffect } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Stack from "react-bootstrap/Stack";
import Table from "react-bootstrap/Table";
import { useRecoilValue, useSetRecoilState } from "recoil";

import AttackMeter from "neverquest/components/Character/AttackMeter";
import FloatingText from "neverquest/components/FloatingText";
import { UIFloatingTextType } from "neverquest/env";
import usePreviousValue from "neverquest/hooks/usePreviousValue";
import { attackRateBonus } from "neverquest/state/attributes";
import { deltaTotalAttackRate } from "neverquest/state/deltas";
import { weapon } from "neverquest/state/inventory";
import { showTotalAttackRateSummary } from "neverquest/state/show";
import { totalAttackRate } from "neverquest/state/stats";
import { formatMilliseconds, formatToFixed, getComputedStat } from "neverquest/utilities/helpers";

export default function AttackMeterDisplay() {
  const setDeltaTotalAttackRate = useSetRecoilState(deltaTotalAttackRate);
  const attackRateBonusValue = useRecoilValue(attackRateBonus);
  const showTotalAttackRateBreakdownValue = useRecoilValue(showTotalAttackRateSummary);
  const totalAttackRateValue = useRecoilValue(totalAttackRate);
  const weaponValue = useRecoilValue(weapon);

  const previousTotalAttackRate = usePreviousValue(totalAttackRateValue);

  const MeterWithDelta = () => (
    <Stack direction="horizontal" className="w-100">
      <AttackMeter />

      <FloatingText atom={deltaTotalAttackRate} />
    </Stack>
  );

  useEffect(() => {
    const difference = totalAttackRateValue - previousTotalAttackRate;

    if (difference === 0) {
      return;
    }

    const isPositive = difference > 0;

    setDeltaTotalAttackRate({
      color: isPositive ? UIFloatingTextType.Negative : UIFloatingTextType.Positive,
      value: `${isPositive ? "+" : "-"}${formatMilliseconds(Math.abs(difference))}`,
    });
  }, [previousTotalAttackRate, totalAttackRateValue]);

  return showTotalAttackRateBreakdownValue ? (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Header as="h4">Attack rate breakdown</Popover.Header>

          <Popover.Body>
            <Table borderless size="sm">
              <tbody>
                <tr>
                  <td className="text-end">Weapon:</td>

                  <td>{formatMilliseconds(weaponValue.rate)}</td>
                </tr>

                <tr>
                  <td>{`${attackRateBonusValue.name} attribute:`}</td>

                  <td>{`-${formatToFixed(getComputedStat(attackRateBonusValue) * 100)}%`}</td>
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
  );
}

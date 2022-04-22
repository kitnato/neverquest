import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Table from "react-bootstrap/Table";
import { useRecoilValue } from "recoil";

import AttackMeter from "neverquest/components/Character/AttackMeter";
import { attackRateBonus } from "neverquest/state/attributes";
import { weapon } from "neverquest/state/inventory";
import { showTotalAttackRateSummary } from "neverquest/state/show";
import { formatMilliseconds, formatToFixed, getComputedStat } from "neverquest/utilities/helpers";

export default function AttackMeterDisplay() {
  const attackRateBonusValue = useRecoilValue(attackRateBonus);
  const showTotalAttackRateBreakdownValue = useRecoilValue(showTotalAttackRateSummary);
  const weaponValue = useRecoilValue(weapon);

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
      <AttackMeter />
    </OverlayTrigger>
  ) : (
    <AttackMeter />
  );
}

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Stack from "react-bootstrap/Stack";
import Table from "react-bootstrap/Table";
import { useAtomValue } from "jotai";

import AttackMeter from "neverquest/components/Character/AttackMeter";
import FloatingText from "neverquest/components/FloatingText";
import ImageIcon from "neverquest/components/ImageIcon";
import icon from "neverquest/icons/striking-splinter.svg";
import useDeltaText from "neverquest/hooks/useDeltaText";
import { attackRateBonus } from "neverquest/state/attributes";
import { deltaTotalAttackRate } from "neverquest/state/deltas";
import { weapon } from "neverquest/state/inventory";
import { showTotalAttackRateSummary } from "neverquest/state/show";
import { totalAttackRate } from "neverquest/state/statistics";
import {
  formatMilliseconds,
  formatPercentage,
  getComputedStat,
} from "neverquest/utilities/helpers";

export default function Attack() {
  const attackRateBonusValue = useAtomValue(attackRateBonus);
  const showTotalAttackRateBreakdownValue = useAtomValue(showTotalAttackRateSummary);
  const weaponValue = useAtomValue(weapon);

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
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Attack rate" />

      {showTotalAttackRateBreakdownValue ? (
        <OverlayTrigger
          overlay={
            <Popover>
              <Popover.Header as="h4">Attack rate breakdown</Popover.Header>

              <Popover.Body>
                <Table borderless size="sm">
                  <tbody>
                    <tr>
                      <td className="fst-italic text-end">Weapon:</td>

                      <td>{formatMilliseconds(weaponValue.rate)}</td>
                    </tr>

                    <tr>
                      <td className="fst-italic text-end">{`${attackRateBonusValue.name} attribute:`}</td>

                      <td>{`-${formatPercentage(getComputedStat(attackRateBonusValue))}`}</td>
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
      )}
    </Stack>
  );
}

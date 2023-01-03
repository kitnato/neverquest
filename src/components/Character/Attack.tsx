import { useEffect } from "react";
import { OverlayTrigger, Popover, Stack, Table } from "react-bootstrap";
import { useRecoilState, useRecoilValue } from "recoil";

import AttackMeter from "@neverquest/components/Character/AttackMeter";
import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/constants";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import { WEAPON_NONE } from "@neverquest/data/gear";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/striking-splinter.svg";
import { attributes } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { totalAttackRate } from "@neverquest/state/statistics";
import { AttributeType, DeltaType, ShowingType } from "@neverquest/types/enums";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";
import { getComputedStatistic } from "@neverquest/utilities/getters";

export default function () {
  const { points } = useRecoilValue(attributes(AttributeType.AttackRate));
  const [showTotalAttackRateDetailsValue, setShowTotalAttackRateDetails] = useRecoilState(
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

  useEffect(() => {
    if (points > 0 && !showTotalAttackRateDetailsValue) {
      setShowTotalAttackRateDetails(true);
    }
  }, [points, setShowTotalAttackRateDetails, showTotalAttackRateDetailsValue]);

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
                        <td className={CLASS_TABLE_CELL_ITALIC}>{`${
                          weaponValue === WEAPON_NONE ? "Base" : "Weapon"
                        }:`}</td>

                        <td>{formatMilliseconds(weaponValue.rate)}</td>
                      </tr>

                      <tr>
                        <td className={CLASS_TABLE_CELL_ITALIC}>{`${name} attribute:`}</td>

                        <td>{`-${formatPercentage(
                          getComputedStatistic({ base, increment, points })
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

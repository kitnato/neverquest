import { useEffect } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import Stack from "react-bootstrap/Stack";
import Table from "react-bootstrap/Table";
import { useRecoilValue, useSetRecoilState } from "recoil";

import FloatingText from "neverquest/components/FloatingText";
import ImageIcon from "neverquest/components/ImageIcon";
import { UIFloatingTextType } from "neverquest/env";
import usePreviousValue from "neverquest/hooks/usePreviousValue";
import icon from "neverquest/icons/wolverine-claws.svg";
import { damage } from "neverquest/state/attributes";
import { deltaTotalDamage } from "neverquest/state/deltas";
import { weapon } from "neverquest/state/inventory";
import { showTotalDamageSummary } from "neverquest/state/show";
import { totalDamage } from "neverquest/state/stats";
import { getComputedStat } from "neverquest/utilities/helpers";

export default function TotalDamage() {
  const damageValue = useRecoilValue(damage);
  const showTotalDamageBreakdownValue = useRecoilValue(showTotalDamageSummary);
  const totalDamageValue = useRecoilValue(totalDamage);
  const weaponValue = useRecoilValue(weapon);
  const setDeltaDamage = useSetRecoilState(deltaTotalDamage);

  const previousTotalDamage = usePreviousValue(totalDamageValue);

  useEffect(() => {
    const difference = totalDamageValue - previousTotalDamage;

    if (difference === 0) {
      return;
    }

    const isPositive = difference > 0;

    setDeltaDamage({
      color: isPositive ? UIFloatingTextType.Positive : UIFloatingTextType.Negative,
      value: `${isPositive ? "+" : ""}${difference}`,
    });
  }, [previousTotalDamage, totalDamageValue]);

  return (
    <Stack direction="horizontal" gap={3}>
      <ImageIcon icon={icon} tooltip="Total damage" />

      {showTotalDamageBreakdownValue ? (
        <OverlayTrigger
          overlay={
            <Popover>
              <Popover.Header as="h4">Damage breakdown</Popover.Header>

              <Popover.Body>
                <Table borderless size="sm">
                  <tbody>
                    <tr>
                      <td className="text-end">Weapon:</td>

                      <td>{weaponValue.damage}</td>
                    </tr>

                    <tr>
                      <td>{`${damageValue.name} attribute:`}</td>

                      <td>{getComputedStat(damageValue)}</td>
                    </tr>
                  </tbody>
                </Table>
              </Popover.Body>
            </Popover>
          }
          placement="top"
        >
          <span>{totalDamageValue}</span>
        </OverlayTrigger>
      ) : (
        <span>{totalDamageValue}</span>
      )}

      <FloatingText atom={deltaTotalDamage} />
    </Stack>
  );
}

import { useAtomValue } from "jotai";
import { OverlayTrigger, Popover, Stack, Table } from "react-bootstrap";

import FloatingText from "neverquest/components/FloatingText";
import ImageIcon from "neverquest/components/ImageIcon";
import useDeltaText from "neverquest/hooks/useDeltaText";
import icon from "neverquest/icons/wolverine-claws.svg";
import { damage } from "neverquest/state/attributes";
import { deltaTotalDamage } from "neverquest/state/deltas";
import { weapon } from "neverquest/state/inventory";
import { showTotalDamageSummary } from "neverquest/state/show";
import { totalDamage } from "neverquest/state/statistics";
import { getComputedStat } from "neverquest/utilities/helpers";

export default function TotalDamage() {
  const damageValue = useAtomValue(damage);
  const showTotalDamageBreakdownValue = useAtomValue(showTotalDamageSummary);
  const totalDamageValue = useAtomValue(totalDamage);
  const weaponValue = useAtomValue(weapon);

  useDeltaText({
    deltaAtom: deltaTotalDamage,
    valueAtom: totalDamage,
  });

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
                      <td className="fst-italic text-end">Weapon:</td>

                      <td>{weaponValue.damage}</td>
                    </tr>

                    <tr>
                      <td className="fst-italic text-end">{`${damageValue.name} attribute:`}</td>

                      <td>{`+${getComputedStat(damageValue)}`}</td>
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

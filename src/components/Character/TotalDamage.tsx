import { useAtomValue } from "jotai";
import { OverlayTrigger, Popover, Stack, Table } from "react-bootstrap";

import FloatingText from "@neverquest/components/FloatingText";
import ImageIcon from "@neverquest/components/ImageIcon";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import icon from "@neverquest/icons/wolverine-claws.svg";
import { attributes } from "@neverquest/state/attributes";
import { deltaTotalDamage } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/inventory";
import { showTotalDamageSummary } from "@neverquest/state/show";
import { totalDamage } from "@neverquest/state/statistics";
import { AttributeType } from "@neverquest/types/enums";
import { getComputedStat } from "@neverquest/utilities/helpers";
import { ATTRIBUTES } from "@neverquest/utilities/constants-attributes";

export default function TotalDamage() {
  const { points } = useAtomValue(attributes)[AttributeType.Damage];
  const showTotalDamageBreakdownValue = useAtomValue(showTotalDamageSummary);
  const totalDamageValue = useAtomValue(totalDamage);
  const weaponValue = useAtomValue(weapon);

  const { base, increment, name } = ATTRIBUTES[AttributeType.Damage];

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
                      <td className="fst-italic text-end">{`${name} attribute:`}</td>

                      <td>{`+${getComputedStat({ base, increment, points })}`}</td>
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

import { OverlayTrigger, Popover, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/constants";
import { ATTRIBUTES } from "@neverquest/constants/attributes";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/wolverine-claws.svg";
import { attributes } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { totalDamage } from "@neverquest/state/statistics";
import { AttributeType, DeltaType, ShowingType } from "@neverquest/types/enums";
import { getComputedStat } from "@neverquest/utilities/helpers";

export default function () {
  const { points } = useRecoilValue(attributes(AttributeType.Damage));
  const showTotalDamageBreakdownValue = useRecoilValue(isShowing(ShowingType.TotalDamageSummary));
  const totalDamageValue = useRecoilValue(totalDamage);
  const weaponValue = useRecoilValue(weapon);

  const { base, increment, name } = ATTRIBUTES[AttributeType.Damage];
  const deltaTotalDamage = deltas(DeltaType.TotalDamage);

  useDeltaText({
    deltaAtom: deltaTotalDamage,
    valueAtom: totalDamage,
  });

  return (
    <IconDisplay
      contents={
        <>
          {showTotalDamageBreakdownValue ? (
            <OverlayTrigger
              overlay={
                <Popover>
                  <Popover.Header as="h4">Damage breakdown</Popover.Header>

                  <Popover.Body>
                    <Table borderless size="sm">
                      <tbody>
                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>Weapon:</td>

                          <td>{weaponValue.damage}</td>
                        </tr>

                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>{`${name} attribute:`}</td>

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
        </>
      }
      Icon={Icon}
      tooltip="Damage per hit"
    />
  );
}

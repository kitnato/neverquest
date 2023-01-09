import { OverlayTrigger, Popover, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/constants";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/wolverine-claws.svg";
import { attributes } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { isShowingDamagePerSecond } from "@neverquest/state/settings";
import { damage, damagePerSecond } from "@neverquest/state/statistics";
import { AttributeType, DeltaType, ShowingType } from "@neverquest/types/enums";
import { getComputedStatistic } from "@neverquest/utilities/getters";

export default function () {
  const { points } = useRecoilValue(attributes(AttributeType.Damage));
  const damageValue = useRecoilValue(damage);
  const damagePerSecondValue = useRecoilValue(damagePerSecond);
  const isShowingDamageSummary = useRecoilValue(isShowing(ShowingType.DamageSummary));
  const isShowingDamagePerSecondValue = useRecoilValue(isShowingDamagePerSecond);
  const weaponValue = useRecoilValue(weapon);

  const { base, increment, name } = ATTRIBUTES[AttributeType.Damage];
  const deltaDamage = deltas(DeltaType.Damage);

  useDeltaText({
    atomDelta: deltaDamage,
    atomValue: damage,
  });

  const damageDisplay = <span>{damageValue}</span>;

  return (
    <IconDisplay
      contents={
        <>
          {isShowingDamageSummary ? (
            <OverlayTrigger
              overlay={
                <Popover>
                  <Popover.Header as="h4">Damage details</Popover.Header>

                  <Popover.Body>
                    <Table borderless size="sm">
                      <tbody>
                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>Weapon:</td>

                          <td>{weaponValue.damage}</td>
                        </tr>

                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>{`${name} attribute:`}</td>

                          <td>{`+${getComputedStatistic({
                            amount: points,
                            base,
                            increment,
                          })}`}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Popover.Body>
                </Popover>
              }
              placement="top"
            >
              {damageDisplay}
            </OverlayTrigger>
          ) : (
            damageDisplay
          )}

          <FloatingText atom={deltaDamage} />
        </>
      }
      description={isShowingDamagePerSecondValue ? `${damagePerSecondValue} DPS` : null}
      Icon={Icon}
      tooltip="Damage"
    />
  );
}

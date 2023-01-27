import { OverlayTrigger, Popover, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/constants";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/wolverine-claws.svg";
import { attributes } from "@neverquest/state/attributes";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { isShowingDamagePerSecond } from "@neverquest/state/settings";
import { damage, damagePerSecond } from "@neverquest/state/statistics";
import { AttributeType, DeltaType, ShowingType } from "@neverquest/types/enums";
import { getComputedStatistic } from "@neverquest/utilities/getters";

export function Damage() {
  const { points } = useRecoilValue(attributes(AttributeType.Damage));
  const damageValue = useRecoilValue(damage);
  const damagePerSecondValue = useRecoilValue(damagePerSecond);
  const isShowingDamageDetails = useRecoilValue(isShowing(ShowingType.DamageDetails));
  const isShowingDamagePerSecondValue = useRecoilValue(isShowingDamagePerSecond);
  const weaponValue = useRecoilValue(weapon);

  const { base, increment, name } = ATTRIBUTES[AttributeType.Damage];
  const DamageDisplay = () => <span>{damageValue}</span>;
  const deltaDamage = deltas(DeltaType.Damage);

  useDeltaText({
    atomDelta: deltaDamage,
    atomValue: damage,
  });

  return (
    <IconDisplay
      contents={
        <>
          {isShowingDamageDetails ? (
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
              <DamageDisplay />
            </OverlayTrigger>
          ) : (
            <DamageDisplay />
          )}

          <FloatingText type={DeltaType.Damage} />
        </>
      }
      description={isShowingDamagePerSecondValue ? `${damagePerSecondValue} DPS` : null}
      Icon={Icon}
      tooltip="Damage"
    />
  );
}

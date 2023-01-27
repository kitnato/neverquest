import { OverlayTrigger, Popover, Stack, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { AttackMeter } from "@neverquest/components/Character/AttackMeter";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/constants";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import { WEAPON_NONE } from "@neverquest/data/gear";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/striking-splinter.svg";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { armorPenalty, attackRate } from "@neverquest/state/statistics";
import { AttributeType, DeltaTextType, DeltaType, ShowingType } from "@neverquest/types/enums";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";

export function Attack() {
  const armorPenaltyValue = useRecoilValue(armorPenalty);
  const attackRateValue = useRecoilValue(attackRate);
  const isShowingAttackRateDetails = useRecoilValue(isShowing(ShowingType.AttackRateDetails));
  const isShowingAttackRatePenalty = useRecoilValue(isShowing(ShowingType.AttackRatePenalty));
  const weaponValue = useRecoilValue(weapon);

  const { name } = ATTRIBUTES[AttributeType.AttackRate];
  const deltaAttackRate = deltas(DeltaType.AttackRate);

  useDeltaText({
    atomDelta: deltaAttackRate,
    atomValue: attackRate,
    type: DeltaTextType.Time,
  });

  const MeterWithDelta = () => (
    <Stack className="w-100" direction="horizontal">
      <AttackMeter />

      <FloatingText type={DeltaType.AttackRate} />
    </Stack>
  );

  return (
    <IconDisplay
      contents={
        isShowingAttackRateDetails ? (
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

                        <td>{`-${formatPercentage(attackRateValue)}`}</td>
                      </tr>

                      {isShowingAttackRatePenalty && (
                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>Penalty from armor:</td>

                          <td>
                            <td>{`+${formatPercentage(
                              armorPenaltyValue
                            )} of total attack rate`}</td>
                          </td>
                        </tr>
                      )}
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

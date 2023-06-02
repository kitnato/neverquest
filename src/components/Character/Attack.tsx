import { OverlayTrigger, Popover, Stack } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { AttackMeter } from "@neverquest/components/Character/AttackMeter";
import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import { WEAPON_NONE } from "@neverquest/data/inventory";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconAttackRate } from "@neverquest/icons/attack-rate.svg";
import { deltas } from "@neverquest/state/deltas";
import { weapon } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { attackRate, attackRateTotal } from "@neverquest/state/statistics";
import { Attribute, Delta, DeltaText, Showing } from "@neverquest/types/enums";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/utilities/constants";
import { formatMilliseconds, formatPercentage } from "@neverquest/utilities/formatters";

export function Attack() {
  const attackRateValue = useRecoilValue(attackRate);
  const isShowingAttackRate = useRecoilValue(isShowing(Showing.AttackRate));
  const isShowingAttackRateDetails = useRecoilValue(isShowing(Showing.AttackRateDetails));
  const weaponValue = useRecoilValue(weapon);

  const { name } = ATTRIBUTES[Attribute.Speed];

  useDeltaText({
    atomDelta: deltas(Delta.AttackRate),
    atomValue: attackRateTotal,
    type: DeltaText.Time,
  });

  if (!isShowingAttackRate) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <OverlayTrigger
          overlay={
            <Popover>
              <Popover.Header className="text-center">Attack rate details</Popover.Header>

              <Popover.Body>
                <DetailsTable>
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
                </DetailsTable>
              </Popover.Body>
            </Popover>
          }
          trigger={isShowingAttackRateDetails ? ["hover", "focus"] : []}
        >
          <Stack className="w-100" direction="horizontal">
            <AttackMeter />

            <FloatingText type={Delta.AttackRate} />
          </Stack>
        </OverlayTrigger>
      }
      Icon={IconAttackRate}
      isAnimated
      tooltip="Attack rate"
    />
  );
}

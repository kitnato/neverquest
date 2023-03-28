import { OverlayTrigger, Popover } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/constants";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconDodgeChance } from "@neverquest/icons/wingfoot.svg";
import { deltas } from "@neverquest/state/deltas";
import { armor } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { dodgeChance, dodgeChanceTotal } from "@neverquest/state/statistics";
import { AttributeType, DeltaType, ShowingType, SkillType } from "@neverquest/types/enums";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function DodgeChance() {
  const { dodgeChanceModifier, staminaCost } = useRecoilValue(armor);
  const dodgeChanceValue = useRecoilValue(dodgeChance);
  const dodgeChanceTotalValue = useRecoilValue(dodgeChanceTotal);
  const isShowingDodgeChanceDetails = useRecoilValue(isShowing(ShowingType.DodgeChanceDetails));
  const dodgeSkill = useRecoilValue(skills(SkillType.Dodge));

  const { name } = ATTRIBUTES[AttributeType.DodgeChance];
  const deltaDodgeChance = deltas(DeltaType.DodgeChance);

  useDeltaText({
    atomDelta: deltaDodgeChance,
    atomValue: dodgeChanceTotal,
  });

  if (!dodgeSkill) {
    return null;
  }

  return (
    <IconDisplay
      contents={
        <>
          <OverlayTrigger
            overlay={
              <Popover>
                <Popover.Header>Dodge details</Popover.Header>

                <Popover.Body>
                  <DetailsTable>
                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>{`${name} attribute:`}</td>

                      <td>{`${formatPercentage(dodgeChanceValue)} dodge chance`}</td>
                    </tr>

                    <tr>
                      <td className={CLASS_TABLE_CELL_ITALIC}>Penalties from armor:</td>

                      <td>
                        {(() => {
                          if (staminaCost) {
                            return `${staminaCost} stamina cost\n`;
                          }

                          if (dodgeChanceModifier) {
                            return `${formatPercentage(dodgeChanceModifier)} dodge chance\n`;
                          }

                          return "None";
                        })()}
                      </td>
                    </tr>
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
            placement="top"
            trigger={isShowingDodgeChanceDetails ? ["hover", "focus"] : []}
          >
            <span>{formatPercentage(dodgeChanceTotalValue)}</span>
          </OverlayTrigger>

          <FloatingText type={DeltaType.DodgeChance} />
        </>
      }
      Icon={IconDodgeChance}
      isAnimated
      tooltip="Dodge chance"
    />
  );
}

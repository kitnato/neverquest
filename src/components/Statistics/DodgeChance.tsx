import { OverlayTrigger, Popover } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import { FloatingText } from "@neverquest/components/FloatingText";
import { IconDisplay } from "@neverquest/components/IconDisplay";
import { DodgePenalty } from "@neverquest/components/Inventory/Armor/DodgePenalty";
import { DetailsTable } from "@neverquest/components/Statistics/DetailsTable";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/data/constants";
import { useDeltaText } from "@neverquest/hooks/useDeltaText";
import { ReactComponent as IconDodgeChance } from "@neverquest/icons/dodge.svg";
import { deltas } from "@neverquest/state/deltas";
import { armor } from "@neverquest/state/inventory";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { dodgeChance, dodgeChanceTotal } from "@neverquest/state/statistics";
import { AttributeType, DeltaType, ShowingType, SkillType } from "@neverquest/types/enums";
import { formatPercentage } from "@neverquest/utilities/formatters";

export function DodgeChance() {
  const { staminaCost } = useRecoilValue(armor);
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
                      <td className={CLASS_TABLE_CELL_ITALIC}>Penalty from armor:</td>

                      <td>
                        <DodgePenalty staminaCost={staminaCost} />
                      </td>
                    </tr>
                  </DetailsTable>
                </Popover.Body>
              </Popover>
            }
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

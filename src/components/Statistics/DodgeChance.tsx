import { OverlayTrigger, Popover, Table } from "react-bootstrap";
import { useRecoilValue } from "recoil";

import FloatingText from "@neverquest/components/FloatingText";
import IconDisplay from "@neverquest/components/IconDisplay";
import { CLASS_TABLE_CELL_ITALIC } from "@neverquest/constants";
import { ATTRIBUTES } from "@neverquest/data/attributes";
import useDeltaText from "@neverquest/hooks/useDeltaText";
import { ReactComponent as Icon } from "@neverquest/icons/wingfoot.svg";
import { deltas } from "@neverquest/state/deltas";
import { isShowing } from "@neverquest/state/isShowing";
import { skills } from "@neverquest/state/skills";
import { armorPenalty, dodgeChance, dodgeChanceTotal } from "@neverquest/state/statistics";
import { AttributeType, DeltaType, ShowingType, SkillType } from "@neverquest/types/enums";
import { formatPercentage } from "@neverquest/utilities/formatters";

export default function () {
  const armorPenaltyValue = useRecoilValue(armorPenalty);
  const dodgeChanceValue = useRecoilValue(dodgeChance);
  const dodgeChanceTotalValue = useRecoilValue(dodgeChanceTotal);
  const isShowingDodgeChanceDetails = useRecoilValue(isShowing(ShowingType.DodgeChanceDetails));
  const dodgeSkill = useRecoilValue(skills(SkillType.Dodge));

  const { name } = ATTRIBUTES[AttributeType.DodgeChance];
  const deltaDodgeChance = deltas(DeltaType.DodgeChance);
  const DodgeChanceDisplay = () => <span>{formatPercentage(dodgeChanceTotalValue)}</span>;

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
          {isShowingDodgeChanceDetails ? (
            <OverlayTrigger
              overlay={
                <Popover>
                  <Popover.Header as="h4">Dodge details</Popover.Header>

                  <Popover.Body>
                    <Table borderless size="sm">
                      <tbody>
                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>{`${name} attribute:`}</td>

                          <td>{`${formatPercentage(dodgeChanceValue)} dodge chance`}</td>
                        </tr>

                        <tr>
                          <td className={CLASS_TABLE_CELL_ITALIC}>Penalty from armor:</td>

                          <td>{`-${formatPercentage(armorPenaltyValue)} of dodge chance`}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Popover.Body>
                </Popover>
              }
              placement="top"
            >
              <DodgeChanceDisplay />
            </OverlayTrigger>
          ) : (
            <DodgeChanceDisplay />
          )}

          <FloatingText type={DeltaType.DodgeChance} />
        </>
      }
      Icon={Icon}
      isAnimated
      tooltip="Dodge chance"
    />
  );
}
